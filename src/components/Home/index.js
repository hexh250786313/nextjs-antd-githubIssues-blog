import { Button } from 'antd';
import Link from 'next/link';
import IfComp from 'if-comp';
import Counter from '../../containers/home/counter';

const Home = () => (
  <>
    <h1>Hello Next.js</h1>
    <Link href="/post/list">
      <Button type="primary">PostList Page</Button>
    </Link>
    <IfComp
      expression={true}
      trueComp={
        <div style={{ marginTop: '20px' }}>
          Redux Counter Demo:
          <Counter />
        </div>
      }
    />
  </>
);
export default Home;
