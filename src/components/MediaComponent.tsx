import * as React from 'react';

const MediaComponent = ({ contentState, block }: any) => {
  const entity = contentState.getEntity(block.getEntityAt(0));

  const type = entity.getType();
  let { src } = entity.getData() as { src: string };

  let media;

  if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'media') {
    src = src.match('youtube.com')?.input ? src.replace('watch?v=', 'embed/') : src;

    media = <IFrame src={src} />;
  }

  return media;
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
