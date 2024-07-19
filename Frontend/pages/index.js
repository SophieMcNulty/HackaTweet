import Home from './Home';
import Login from './login';
import { useSelector } from 'react-redux';

function Index() {
  const user = useSelector((state) => state.user.value);

  let page = <Login />

  if (user.isConnected) {
    page = <Home />
  }




  return (
    <>
      {page}
    </>
  )
}

export default Index;
