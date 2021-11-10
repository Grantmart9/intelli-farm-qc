/**
 * @description      :
 * @author           : Grant
 * @group            :
 * @created          : 26/08/2021 - 10:44:59
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 26/08/2021
 * - Author          : Grant
 * - Modification    :
 **/

import { useEffect } from "react";

const INTERVAL = 10000;

export const useRefetch = (refetch, refresh = true) =>
  useEffect(() => {
    if (refresh) {
      const interval = setInterval(() => {
        refetch();
      }, INTERVAL);
      return () => clearInterval(interval);
    }
  }, [refetch, refresh]);
