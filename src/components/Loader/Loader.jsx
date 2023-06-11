import {  RotatingLines  } from 'react-loader-spinner';
import { LoaderSpinner } from "./Loader.styled";

const Loader = () => {
  return (
    <LoaderSpinner>
      
      <RotatingLines
        strokeColor="grey"
        strokeWidth="3"
        animationDuration="0.75"
        visible={true}
      />
      <p>Loading...</p>
    </LoaderSpinner>
  )
}

export { Loader };