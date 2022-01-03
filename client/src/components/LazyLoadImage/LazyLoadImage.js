import { useCallback, useState } from 'preact/hooks';

export const LazyLoadImage = (props) => {
    const [display, setDisplay] = useState(false)

    const callback = useCallback((el) => {
        let observer = new IntersectionObserver((entries) => {
            if (entries.some(e => e.intersectionRatio > 0)) {
                setDisplay(true)
            }
        });

        observer.observe(el);

        return () => observer.disconnect()
    }, [])


    return (
        <div ref={callback}>
            {display && <img {...props} />}
        </div>
    )
}