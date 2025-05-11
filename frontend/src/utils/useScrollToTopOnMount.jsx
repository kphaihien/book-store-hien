import { useEffect } from 'react';

const useScrollToTopOnMount = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
};

export default useScrollToTopOnMount;