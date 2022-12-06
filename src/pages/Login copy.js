import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Header from 'components/login/Header';
import Page from 'components/login/Page';
import Container from 'components/login/Container';


export default function Login() {
    return (
    <>
    <div className=''>
        <Header/>
    </div>
        <div className='mt-44'>
            <Page>
                <Container>
                    <Card>
                        <CardHeader color='red'>
                            <H5 color="black" style={{ marginBottom: 0 }}>
                                Login
                            </H5>
                        </CardHeader>
                        <CardBody>
                            <br></br>
                            <div className="mb-12 px-4 bg-bb">
                                <InputIcon
                                    type="email"
                                    color="lightBlue"
                                    placeholder="Email"
                                    iconName="email"/>
                                </div>
                            <div className="mb-8 px-4">
                                <InputIcon
                                    type="password"
                                    color="lightBlue"
                                    placeholder="Password"
                                    iconName="lock"/>
                            </div>
                        </CardBody>
                        <CardFooter>
                            <div className="flex justify-center yb">
                                <Button
                                    color="red"
                                    buttonType="link"
                                    size="lg"
                                    ripple="dark">
                                    Login
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Container>
            </Page>
        </div>
    </>
);
}
