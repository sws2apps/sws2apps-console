import { OAuthProvider } from 'firebase/auth';
import OAuthButtonBase from './OAuthButtonBase';
import microsoftIcon from '../../img/microsoft.svg';

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
  prompt: 'consent',
});

const OAuthMicrosoft = () => {
  return (
    <OAuthButtonBase
      provider={provider}
      text="Continue with Microsoft"
      buttonStyles={{
        backgroundColor: '#2F2F2F',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#2F2F2F',
          color: '#FFFFFF',
        },
      }}
      logo={microsoftIcon}
    />
  );
};

export default OAuthMicrosoft;
