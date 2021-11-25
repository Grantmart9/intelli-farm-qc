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

export const useRefetch = (refetch, refresh = true, period = 60000) =>
  useEffect(() => {
    if (refresh) {
      const interval = setInterval(() => {
        refetch();
      }, period);
      return () => clearInterval(interval);
    }
  }, [refetch, refresh]);
