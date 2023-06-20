/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, type UseQueryOptions, useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useClient } from '../useClient';
import type { Ref } from 'vue'

export default function useInternetofsportsBlockchainBlockchain() {
  const client = useClient();
  const QueryParams = ( options: any) => {
    const key = { type: 'QueryParams',  };    
    return useQuery([key], () => {
      return  client.InternetofsportsBlockchainBlockchain.query.queryParams().then( res => res.data );
    }, options);
  }
  
  const QueryGetTeam = (name: string,  options: any) => {
    const key = { type: 'QueryGetTeam',  name };    
    return useQuery([key], () => {
      const { name } = key
      return  client.InternetofsportsBlockchainBlockchain.query.queryGetTeam(name).then( res => res.data );
    }, options);
  }
  
  return {QueryParams,QueryGetTeam,
  }
}