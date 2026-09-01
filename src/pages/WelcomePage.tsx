import { Link } from "react-router-dom";
import welcomeImage from "@/assets/welcome-image.png";

type WelcomePageProps = {
  isLoading: boolean;
  setCount: number;
  totalCards: number;
};

function WelcomePage({ isLoading, setCount, totalCards }: WelcomePageProps) {
  return (
    <section className="page-shell hero-page">
      <div className="hero-copy">
        <span className="eyebrow">English composition practice</span>
        <h1>
          英語を、
          <br />
          <em>めくって</em>
          <br />
          楽しく覚えよう。
        </h1>
        <p className="hero-lead">
          3年生〜6年生で習った文を、自分のペースで何度でも。カードをめくって、声に出して、少しずつ身につけよう。
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" to="/menu">
            学習をはじめる
            <span aria-hidden="true">→</span>
          </Link>
          <Link className="text-link" to="/revise">
            復習リストを見る
          </Link>
        </div>
        <dl className="hero-stats" aria-label="教材の内容">
          <div>
            <dt>{isLoading ? "…" : setCount}</dt>
            <dd>セット</dd>
          </div>
          <div>
            <dt>{isLoading ? "…" : totalCards}</dt>
            <dd>カード</dd>
          </div>
          <div>
            <dt>いつでも</dt>
            <dd>保存される進捗</dd>
          </div>
        </dl>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="decorative-card decorative-card-one">Hello!</div>
        <div className="decorative-card decorative-card-two">こんにちは</div>
        <div className="hero-image-wrap">
          <img src={welcomeImage} alt="" />
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
