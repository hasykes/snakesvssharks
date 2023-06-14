import { Container, Spacer} from '@/components/Layout';
import { LoadingDots } from '@/components/LoadingDots';
import  styles  from './LoadingComp.module.css';
import Image from 'next/image';

const LoadingComp = () => {
    return (
    <>
     <Container column alignItems="center" justifyContent="center">
        <Spacer size={4} axis="vertical"/>
        <Image src="/images/snakesvssharkslogo.png" alt="snake and a shark fighting to the death" width={250} height={250}/>
        <LoadingDots />
      </Container>
    </>
    )

};

export default LoadingComp;