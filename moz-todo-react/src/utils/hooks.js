import { useRef, useEffect } from 'react';

// check out: https://biio-studying.tistory.com/244
export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
