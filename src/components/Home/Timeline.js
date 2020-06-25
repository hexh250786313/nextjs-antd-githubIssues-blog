import { Timeline as AntTimeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Item } = AntTimeline;

const Timeline = () => {
  return (
    <AntTimeline mode="alternate">
      <Item>Create a services site 2015-09-01</Item>
      <Item color="green">Solve initial network problems 2015-09-01</Item>
      <Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </Item>
      <Item color="red">Network problems being solved 2015-09-01</Item>
      <Item>Create a services site 2015-09-01</Item>
      <Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
        Technical testing 2015-09-01
      </Item>
    </AntTimeline>
  );
};

export default Timeline;
