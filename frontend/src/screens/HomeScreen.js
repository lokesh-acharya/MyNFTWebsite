import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';

export default function HomeScreen(props) {
  const sendMintRequestHandler = () => {
    props.history.push('/signin?redirect=file1');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>HomePage</h1>
        <LoremIpsum p={2} />
        <h2>Headline</h2>
        <LoremIpsum p={3} />
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <LoremIpsum p={2} />
            </li>
            <li>
              Send a NFT mint request
            </li>
            <li>
              <button
                type="button"
                onClick={sendMintRequestHandler}
                className="primary block"                
              >
                Proceed to send a NFT mint request
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Further</h2>
        <LoremIpsum p={2} />
      </div>
    </div>
  );
}
