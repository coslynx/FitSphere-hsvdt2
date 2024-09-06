import { useState } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { LinkedinShareButton, LinkedinIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';

interface SocialShareButtonProps {
  title: string;
  url: string;
}

const SocialShareButton: React.FC<SocialShareButtonProps> = ({ title, url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton url={url} subject={title} body={url}>
        <EmailIcon size={32} round />
      </EmailShareButton>
      <button onClick={copyToClipboard} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 14a1 1 0 11-2 0v-12a1 1 0 012 0v12zm-3-1.732A1 1 0 019 16v-12a1 1 0 011-1zm4 1.732A1 1 0 0113 16v-12a1 1 0 011-1z" />
        </svg>
        {isCopied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
};

export default SocialShareButton;