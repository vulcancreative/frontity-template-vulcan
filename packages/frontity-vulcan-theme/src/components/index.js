import React from "react";
import { Global, css, connect, styled, Head } from "frontity";
import BarlowSemiBoldWoff2 from "./../fonts/Barlow-SemiBold.woff2";
import BarlowSemiBoldWoff from "./../fonts/Barlow-SemiBold.woff";
import BarlowBoldWoff2 from "./../fonts/Barlow-Bold.woff2";
import BarlowBoldWoff from "./../fonts/Barlow-Bold.woff";
import BarlowMediumWoff2 from "./../fonts/Barlow-Medium.woff2";
import BarlowMediumWoff from "./../fonts/Barlow-Medium.woff";
import Switch from "@frontity/components/switch";
import Header from "./header/header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import gutenbergStyle from "./styles/gutenberg/style.css";
import gutenbergTheme from "./styles/gutenberg/theme.css";
import getwidStyle from "./styles/getwid/style.css";
import getwidEditor from "./styles/getwid/editor.css";
import stackableAdmin from "./styles/stackable/admin.css";
import stackableEditor from "./styles/stackable/editor.css";
import stackableEditorWP from "./styles/stackable/editor_wp_v5_3.css";
import stackableFrontend from "./styles/stackable/frontend.css";
import mainCss from "./styles/main.css";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      {
        state.theme.isGutenbergPlugin &&
        <>
          <Global styles={css(gutenbergStyle)} />
          <Global styles={css(gutenbergTheme)} />
        </>
      }
      {
        state.theme.isStackablePlugin &&
        <>
          <Global styles={css(stackableAdmin)} />
          <Global styles={css(stackableEditor)} />
          <Global styles={css(stackableEditorWP)} />
          <Global styles={css(stackableFrontend)} />
        </>
      }
      {
        state.theme.isGetwidPlugin &&
        <>
          <Global styles={css(getwidStyle)} />
          <Global styles={css(getwidEditor)} />
        </>
      }
      <Global styles={css(mainCss)} />
      <Global styles={globalStyles} />
      {state.frontity.platform === "server" && <Global
        styles={css` 
          @font-face {
            font-family: 'Barlow';
            src: url("${BarlowBoldWoff2}") format('woff2'),
                url("${BarlowBoldWoff}") format('woff');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Barlow';
            src: url("${BarlowSemiBoldWoff2}") format('woff2'),
                url("${BarlowSemiBoldWoff}") format('woff');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Barlow';
            src: url("${BarlowMediumWoff2}") format('woff2'),
                url("${BarlowMediumWoff}") format('woff');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
      `}
        supressHydrationWarning
      />}

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <List when={data.isArchive} />
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </Main>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: "Barlow", sans-serif;
  }
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
  p:empty {
    margin: 0;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1f38c5;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
