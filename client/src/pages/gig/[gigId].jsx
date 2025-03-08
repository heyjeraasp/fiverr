import Details from '@/components/Gigs/Details';
import Pricing from '@/components/Gigs/Pricing';
import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/StateContext';
import { CHECK_USER_ORDERED_GIG_ROUTE, GET_GIG_DATA } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';

function GigsPage() {
    const router = useRouter();
    const [cookies] = useCookies();
    const { gigId } = router.query;

    const [{userInfo},dispatch] = useStateProvider();

    useEffect(() => {
        const fetchGigData = async () => {
          try {
            const {
              data: { gig },
            } = await axios.get(`${GET_GIG_DATA}/${gigId}`);
            dispatch({type:reducerCases.SET_GIG_DATA,gigData: gig })
            
            // setData({ ...gig, time: gig.revisions });
            // setfeatures(gig.features);
    
            // gig.images.forEach((image) => {
            //   const url = "http://localhost:8747/uploads/" + image;
            //   const fileName = image;
            //   fetch(url).then(async (response) => {
            //     const contentType = response.headers.get("content-type");
            //     const blob = await response.blob();
            //     const files = new File([blob], fileName, { contentType });
            //     setFile([files]);
            //   });
            // });
          } catch (err) {
            console.log(err);
          }
        };
        if (gigId) fetchGigData();
      }, [gigId,dispatch]);

      useEffect(() => {
        const checkGigOrdered = async () => {
          const {
            data: { hasUserOrderedGig },
          } = await axios.get(`${CHECK_USER_ORDERED_GIG_ROUTE}/${gigId}`,{headers:{
            //Authorization: `Bearer ${cookies.jwt}`,
            Authorization: `Bearer ${cookies.jwt.jwt}`
           }}
          );
          dispatch({
            type: reducerCases.HAS_USER_ORDERED_GIG,
            hasOrdered: hasUserOrderedGig,
          });
        };
        if (userInfo) {
          checkGigOrdered();
        }
      }, [dispatch, gigId, userInfo]);

      return (
        <div className="grid grid-cols-3 mx-32 gap-20">
          <Details />
          <Pricing />
        </div>
      );
}

export default GigsPage