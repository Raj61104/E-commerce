import { useEffect, useState } from "react";

export default function useLoader() {

  const [loading, setLoading] =
    useState(true);

  const [showSkeleton, setShowSkeleton] =
    useState(true);

  useEffect(() => {

    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);

    return () => {

      clearTimeout(loadingTimer);

      clearTimeout(skeletonTimer);

    };

  }, []);

  return {
    loading,
    showSkeleton,
  };
}   