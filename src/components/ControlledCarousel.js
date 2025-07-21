import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
  <Carousel.Item className='rounded'>
    <div className="d-flex justify-content-center">
      <img 
        src='https://ntvb.tmsimg.com/assets/p28215037_v_h8_ab.jpg?w=960&h=540' 
        alt='First slide' 
        className='rounded img-carousel'
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
    <Carousel.Caption>
      <h3>Minecraft</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className='rounded'>
    <div className="d-flex justify-content-center">
      <img 
        src='https://aeonmall-review-rikkei.cdn.vccloud.vn/public/wp/21/news/E1NX4UxlFeJ9uGNhsAjecIyPW2nJzBwHDXcm7VAy.jpg' 
        alt='Second slide' 
        className='rounded img-carousel'
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
    <Carousel.Caption>
      <h3>Địa đạo</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className='rounded'>
    <div className="d-flex justify-content-center">
      <img 
        src='https://cdn.popsww.com/blog-kids/sites/3/2021/08/raya-va-rong-than-cuoi-cung.jpg' 
        alt='Third slide' 
        className='rounded img-carousel'
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
    <Carousel.Caption>
      <h3>Raya: Rồng thần cuối cùng</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  );
}

export default ControlledCarousel;