import { useState } from "react";

export const usePullToRefresh = (refetch: () => void) => {
    const [loadingRefresh, setLoadingRefresh] = useState(false);

    const pullToRefresh = () => {
        setLoadingRefresh(true);
        refetch();
        setLoadingRefresh(false);
    }

    return {
        loadingRefresh,
        pullToRefresh
    }
}