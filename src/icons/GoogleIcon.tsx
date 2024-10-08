import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export default function Icon(props: SvgIconProps) {
    return (
      <SvgIcon {...props}>
        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_746_5893)">
        <path d="M24.266 13.1514C24.266 12.3357 24.1999 11.5156 24.0588 10.7131H12.74V15.3341H19.2217C18.9528 16.8244 18.0885 18.1428 16.823 18.9806V21.9789H20.69C22.9608 19.8889 24.266 16.8024 24.266 13.1514Z" fill="#4285F4"/>
        <path d="M12.74 24.8758C15.9764 24.8758 18.7058 23.8132 20.6944 21.9789L16.8274 18.9805C15.7516 19.7125 14.3626 20.127 12.7444 20.127C9.61376 20.127 6.95934 18.0149 6.00693 15.1753H2.01648V18.2662C4.05359 22.3184 8.20278 24.8758 12.74 24.8758V24.8758Z" fill="#34A853"/>
        <path d="M6.00253 15.1753C5.49987 13.6849 5.49987 12.0711 6.00253 10.5807V7.48981H2.01649C0.31449 10.8806 0.31449 14.8754 2.01649 18.2662L6.00253 15.1753V15.1753Z" fill="#FBBC04"/>
        <path d="M12.74 5.62466C14.4508 5.5982 16.1043 6.24197 17.3433 7.42367L20.7694 3.99762C18.6 1.9605 15.7207 0.840534 12.74 0.875809C8.20277 0.875809 4.05359 3.43322 2.01648 7.48981L6.00252 10.5808C6.95052 7.73673 9.60935 5.62466 12.74 5.62466V5.62466Z" fill="#EA4335"/>
        </g>
        <defs>
        <clipPath id="clip0_746_5893">
        <rect width="24" height="24" fill="white" transform="translate(0.5 0.875)"/>
        </clipPath>
        </defs>
        </svg>

      </SvgIcon>
    );
  };