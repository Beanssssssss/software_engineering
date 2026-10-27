"use client";

import { useState } from "react";
import logo from "@/data/img/logo.png";
import { useApp } from "./AppContext";
import type { Settings } from "@/data/format";
import { summary } from "./SettingsPanel";
import type { Tab } from "@/data/houses";

type Props = {
  tab: Tab;
  onTab: (t: Tab) => void;
  onEnd?: () => void;
  saved: Settings;
  settingsOpen: boolean;
  onToggleSettings: () => void;
  loggedIn: boolean;
  onToggleLogin: () => void;
  mapFail: boolean;
  rateFail: boolean;
  locDenied: boolean;
  onLocDenied: (v: boolean) => void;
  onMapFail: (v: boolean) => void;
  onRateFail: (v: boolean) => void;
  onTour: () => void;
};

export default function Header(p: Props) {
  const { t } = useApp();
  const [tools, setTools] = useState(false);
  const [account, setAccount] = useState(false);

  return (
    <header className="main-header">
      <nav className="gnb">
        <button className={p.tab === "apt" ? "on" : ""} data-tour="tab-apt" onClick={() => p.onTab("apt")}>{t("nav.apt")}</button>
        <button className={p.tab === "room" ? "on" : ""} data-tour="tab-room" onClick={() => p.onTab("room")}>{t("nav.room")}</button>
        <button className={p.tab === "villa" ? "on" : ""} data-tour="tab-villa" onClick={() => p.onTab("villa")}>{t("nav.villa")}</button>
        <button className={p.tab === "office" ? "on" : ""} data-tour="tab-office" onClick={() => p.onTab("office")}>{t("nav.office")}</button>
        <button className={p.tab === "shop" ? "on" : ""} data-tour="tab-shop" onClick={() => p.onTab("shop")}>{t("nav.shop")}</button>
      </nav>
      <span className="logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt="" width={36} height={36} />피터팬의 좋은 방 구하기(프로토타입)
      </span>
      <div className="right">
        <button className={`set-btn${p.settingsOpen ? " active" : ""}`} data-tour="settings-btn" onClick={p.onToggleSettings}>
          {summary(p.saved, t)}<span className="caret" />
        </button>

        <div className="tools-wrap">
          <button className="tools-btn" onClick={() => setTools(!tools)}>시연 도구</button>
          {tools && (
            <div className="tools" onMouseLeave={() => setTools(false)}>
              <label><input type="checkbox" checked={p.mapFail} onChange={(e) => p.onMapFail(e.target.checked)} />지도 API 장애</label>
              <label><input type="checkbox" checked={p.locDenied} onChange={(e) => p.onLocDenied(e.target.checked)} />위치 권한 거부</label>
              <label><input type="checkbox" checked={p.rateFail} onChange={(e) => p.onRateFail(e.target.checked)} />환율 서비스 장애</label>
              <button onClick={() => { setTools(false); p.onTour(); }}>코치마크 다시 보기</button>
            </div>
          )}
        </div>

        <button className="a post">{t("hdr.post")}</button>
        <div className="tools-wrap">
          <button className="login-btn" data-tour="account-btn" onClick={() => setAccount(!account)}>
            <span className="pf" />{p.loggedIn ? t("hdr.loggedin") : t("hdr.account")}<span className="caret" />
          </button>
          {account && (
            <div className="tools account-menu" onMouseLeave={() => setAccount(false)}>
              <button onClick={() => { setAccount(false); p.onToggleLogin(); }}>{p.loggedIn ? "로그아웃으로 전환" : "로그인으로 전환"}</button>
              {p.onEnd && <button className="end" onClick={() => { setAccount(false); p.onEnd!(); }}>시연 종료</button>}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
