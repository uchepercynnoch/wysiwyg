import * as React from 'react';

import parse from 'html-react-parser';

const MediaComponent = ({ contentState, block }: any) => {
  const entity = contentState.getEntity(block.getEntityAt(0));

  const type = entity.getType();
  let { src } = entity.getData() as { src: string };

  if (type === 'image') return <Image src={src} />;

  if (type === 'Youtube') {
    src = src.replace('watch?v=', 'embed/');

    return <IFrame src={src} />;
  }

  if (type === 'Twitch') return <IFrame src={src} />;

  if (type === 'Facebook' || 'Twitter') return parse(src);
};

type MediaPropTypes = {
  src: string | undefined;
};

const Image = (props: MediaPropTypes) => {
  return <img src={props.src} style={styles.media} alt="" />;
};

const IFrame = (props: MediaPropTypes) => {
  return <iframe src={props.src} style={styles.media} title="Media" />;
};
const styles = {
  media: {
    width: '100%',
    height: '400px',
  },
};

export default MediaComponent;
