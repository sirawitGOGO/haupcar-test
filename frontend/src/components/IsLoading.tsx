import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const IsLoading = ({ size }: { size: SizeType; }) => (
  <Flex align="center">
    <Spin indicator={<LoadingOutlined spin />} size={size} />
  </Flex>
);

export default IsLoading;