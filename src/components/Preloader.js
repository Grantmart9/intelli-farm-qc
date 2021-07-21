
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';

import LodiconLogo from "../assets/img/lodicon-logo.svg";

export default (props) => {

  const { loading } = props;

  return (
    <div className="preloader flex flex-col place-items-center absolute inset-0">
      <Image className="loader-element place-self-center" src={LodiconLogo} height={40} />
    </div>
  );
};
