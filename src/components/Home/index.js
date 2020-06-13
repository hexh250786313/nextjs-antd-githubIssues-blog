import { Button } from 'antd';
import Link from 'next/link';
import IfComp from 'if-comp';
import Counter from '../../containers/home/counter';

const Home = () => (
  <>
    <h1>Hello Next.js</h1>
    <Link href='/user/list'>
      <Button type='primary'>UserList Page</Button>
    </Link>
    <Link href='/'>
      <Button type='primary'>hello</Button>
    </Link>
    <Link href={`/user/[username]`} as={`/user/${`1`}`}>
      <Button type='primary'>tony</Button>
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
