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

const INTERVAL = 60000;

export const useRefetch = (refetch) =>
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [refetch]);
