import styled from "styled-components";
import FacebookLogo from "@/public/images/social/facebook-logo.svg";
import TwitterLogo from "@/public/images/social/twitter-logo.svg";
import YoutubeLogo from "@/public/images/social/youtube-logo.svg";
import InstagramLogo from "@/public/images/social/instagram-logo.svg";

const FooterContainer = styled.footer`
  background-color: var(--gray-900);
  color: var(--gray-400);
  font-size: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 60px;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    padding: 32px 104px 108px 104px;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    padding: 32px 200px 108px 200px;
  }
`;

const Copyright = styled.div`
  order: 3;
  flex-basis: 100%;

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    flex-basis: auto;
    order: 0;
  }
`;

const FooterMenu = styled.div`
  display: flex;
  gap: 30px;
  color: var(--gray-200);
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 12px;
`;

const Footer = () => (
  <FooterContainer>
    <Copyright>©codeit - 2024</Copyright>

    <FooterMenu>
      <a href="/privacy">Privacy Policy</a>
      <a href="/faq">FAQ</a>
    </FooterMenu>

    <SocialMedia>
      <a
        href="https://www.facebook.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 페이스북"
      >
        <FacebookLogo alt="페이스북" width={20} height={20} />
      </a>
      <a
        href="https://twitter.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 트위터"
      >
        <TwitterLogo alt="트위터" width={20} height={20} />
      </a>
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 유튜브"
      >
        <YoutubeLogo alt="유튜브" width={20} height={20} />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="판다마켓 인스타그램"
      >
        <InstagramLogo alt="인스타그램" width={20} height={20} />
      </a>
    </SocialMedia>
  </FooterContainer>
);

export default Footer;
