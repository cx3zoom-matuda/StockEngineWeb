import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Link, Route, Router, Switch, useLocation } from "wouter";
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Database,
  FileCheck2,
  Gauge,
  LineChart,
  Menu,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

const heroImage = "/manus-storage/stock-engine-hero_f9a43208.png";
const screenerImage = "/manus-storage/stock-engine-screener_8cff25b4.png";
const portfolioImage = "/manus-storage/stock-engine-portfolio_904ce944.png";
const timelineImage = "/manus-storage/stock-engine-timeline_bfb30d5d.png";
const markImage = "/manus-storage/stock-engine-mark_034a428f.png";

export type Mode = {
  number: string;
  slug: string;
  name: string;
  en: string;
  short: string;
  promise: string;
  icon: typeof Radar;
  image?: string;
  accent: string;
  input: string;
  engine: string;
  output: string;
  safety: string;
  intro: string;
  steps: string[];
  outputs: { label: string; detail: string }[];
  notes: string[];
};

const glossary: Record<string, { term: string; definition: string }> = {
  "マクロ経済": { term: "マクロ経済", definition: "インフレ、金利、為替、GDP、エネルギーなど、個別企業を取り巻く経済全体の動きです。" },
  "マクロスコア": { term: "マクロスコア", definition: "銘柄やポートフォリオが現在の経済環境から受ける追い風・逆風を、保有比率などを踏まえてまとめた指標です。" },
  "バリュエーション": { term: "バリュエーション", definition: "株価が企業の利益や資産などに対して割高か割安かを評価する考え方です。" },
  "Rationale": { term: "Rationale", definition: "評価結果に至った理由。Stock Engineではマクロ要因とバリュエーション要因を組み合わせて示します。" },
  "マクロ逆風": { term: "マクロ逆風", definition: "金利上昇やインフレなど、特定のセクターや銘柄に不利に働く経済環境です。" },
  "リバランス": { term: "リバランス", definition: "環境変化に合わせて、ポートフォリオ内のセクターや資産の比率を調整することです。" },
  "ペーパートレード": { term: "ペーパートレード", definition: "実際の注文や資金を使わず、仮想口座で売買と結果を検証するシミュレーションです。" },
  "Hit / Miss": { term: "Hit / Miss", definition: "過去の予測が、その後の市場結果に対して成功したか失敗したかを示す検証ラベルです。" },
  "G20": { term: "G20", definition: "主要国・地域で構成される国際的な経済協議の枠組み。本ガイドではマクロ指標の対象範囲を示します。" },
  "Active Monitoring": { term: "Active Monitoring", definition: "マクロイベントを継続監視し、条件に合致した場合にポートフォリオ再評価と通知を行う設定です。" },
  "Severity": { term: "Severity", definition: "イベントの重大度。通知する最低レベルを設定し、軽微な変化による通知を抑制できます。" },
};

const modeGlossary: Record<string, string[]> = {
  "market-screener": ["マクロ経済", "バリュエーション", "Rationale"],
  "portfolio-analyzer": ["マクロスコア", "マクロ逆風", "リバランス"],
  "paper-trading": ["ペーパートレード", "マクロスコア"],
  "verification-board": ["Hit / Miss", "バリュエーション"],
  "macro-timeline": ["マクロ経済", "G20"],
  alerts: ["Active Monitoring", "Severity", "G20"],
};

export const modes: Mode[] = [
  {
    number: "01",
    slug: "market-screener",
    name: "マーケットスクリーナー",
    en: "Market Screener & Hub",
    short: "市場と銘柄を、マクロの地図に置く。",
    promise: "国・地域のマクロ指標と個別銘柄の評価を重ね、判断の理由まで可視化する入口。",
    icon: Radar,
    image: screenerImage,
    accent: "cobalt",
    input: "分析市場・ティッカーリスト・最新市場データ",
    engine: "マクロ要因、バリュエーション、セクター影響を組み合わせた再評価",
    output: "BUY / WATCH / AVOID と判断理由、銘柄別ブレイクダウン",
    safety: "自動評価の根拠を確認してから、次の分析へ進むための画面",
    intro: "世界主要市場のマクロ経済指標と、監視する銘柄のバリュエーションを一つの画面で重ね合わせます。単なるランキングではなく、なぜその判定になったのかを読むためのモードです。",
    steps: [
      "上部の国旗ボタンから、日本・米国・ユーロ圏など分析対象の市場を選択します。",
      "サイドバーのスクリーニングリストに対象ティッカーを入力し、データを再読込して再評価します。",
      "評価表で BUY / WATCH / AVOID の判定と、マクロ要因・バリュエーション要因の Rationale を確認します。",
      "詳細分析パネルで銘柄を選び、各マクロ指標が業界に与えるプラス・マイナスの内訳を読みます。",
    ],
    outputs: [
      { label: "評価判定", detail: "BUY / WATCH / AVOID の3段階で、監視銘柄の現在の立ち位置を比較。" },
      { label: "Rationale", detail: "マクロの追い風・逆風と、バリュエーション要因を理由として表形式で提示。" },
      { label: "詳細ブレイクダウン", detail: "選択した銘柄のセクターに対し、どの指標が影響したかをビジュアルで確認。" },
    ],
    notes: ["国・地域の変更は、同じ銘柄でも評価の前提を変えます。", "再評価の前に、スクリーニングリストのティッカー表記を確認してください。"],
  },
  {
    number: "02",
    slug: "portfolio-analyzer",
    name: "ポートフォリオ分析",
    en: "My Portfolio Macro Analyzer",
    short: "CSVを入れる。マクロとの距離を測る。",
    promise: "保有比率を起点に、ポートフォリオ全体のマクロ適合度と潜在リスクを診断する。",
    icon: CircleDollarSign,
    image: portfolioImage,
    accent: "cobalt",
    input: "証券会社から出力した保有銘柄CSV",
    engine: "保有比率で重み付けしたマクロスコアと、セクター別の逆風検出",
    output: "加重平均マクロスコア、リスク検出、リバランス提案",
    safety: "CSVはブラウザ内のセッションメモリで処理され、タブを閉じると消去",
    intro: "実際の保有銘柄を、現在のマクロ経済環境に照らして診断します。個別株の良し悪しではなく、保有比率を含めた“組み合わせ”がどのような風向きを受けているかを把握するためのモードです。",
    steps: [
      "楽天証券、SBI証券、IBKR、Charles Schwab、Fidelityなどから保有銘柄CSVを出力します。",
      "ポートフォリオ分析のアップロードエリアにCSVをドラッグ＆ドロップします。",
      "加重平均マクロスコア、マクロ逆風リスク、セクターリバランス提案を確認します。",
      "必要に応じてポートフォリオ診断レポートをPDF / HTMLとしてローカルに出力します。",
    ],
    outputs: [
      { label: "加重平均マクロスコア", detail: "保有比率に応じた、マクロ経済との適合度を総合スコアで表示。" },
      { label: "逆風リスク", detail: "金利上昇やインフレなどが、保有中の不動産・ハイテク等に与える影響を警告。" },
      { label: "リバランス提案", detail: "比率を減らすセクター、増やすセクターの方向性を具体化。" },
    ],
    notes: ["対応形式は証券会社ごとに異なるため、列名が標準形式に近いCSVを使用してください。", "ソースガイドでは、アップロードデータはサーバーに送信・保存されない仕様として説明されています。"],
  },
  {
    number: "03",
    slug: "paper-trading",
    name: "仮想取引ハブ",
    en: "Paper Trading Hub",
    short: "シナリオを、資金を失わずに試す。",
    promise: "マクロシナリオに沿った仮想口座で、売買・ポジション・含み損益の変化を検証する。",
    icon: Gauge,
    accent: "cobalt",
    input: "口座・ティッカー・BUY / SELL・数量",
    engine: "現在株価の取得、仮想約定、ポジションとマクロスコアの更新",
    output: "保有ポジション、含み損益、口座別マクロスコア",
    safety: "口座状態はJSONとしてローカル保存・読み込みできるサンドボックス",
    intro: "仮想資金を使って、マクロの追い風・逆風に対する投資方針を試すサンドボックスです。リアルマネーの意思決定の前に、口座の性格とポジションの変化を観察できます。",
    steps: [
      "Macro Tailwind Focus、Defensive & Income、Aggressive Growth、Long-Term Value、Sandboxから口座を切り替えます。",
      "ティッカー、売買区分、数量を入力します。単価を0にすると現在のリアルタイム株価を自動取得します。",
      "取引後にポジション、含み損益、ポートフォリオ全体のマクロスコアを確認します。",
      "口座データをJSONで保存し、次回に読み込んで検証を続けます。",
    ],
    outputs: [
      { label: "5つの口座", detail: "追い風特化、防御・インカム、アグレッシブ成長、長期バリュー、自由検証。" },
      { label: "売買シミュレーション", detail: "BUY / SELL と数量を入力し、仮想ポジションを更新。" },
      { label: "状態の持ち運び", detail: "JSONの保存・読み込みで、検証状態を手元に残せる。" },
    ],
    notes: ["これはペーパートレード用のサンドボックスであり、実際の注文を送信する機能ではありません。", "口座の性格を変えると、同じ銘柄でも検証の問いが変わります。"],
  },
  {
    number: "04",
    slug: "verification-board",
    name: "予測の自己検証ボード",
    en: "Track Record / Verification Board",
    short: "予測を、あとから検証できる形にする。",
    promise: "過去のBUY / AVOIDなどの判定を、実際の市場データと照合し、精度とリターンを公開する。",
    icon: FileCheck2,
    accent: "cobalt",
    input: "データベース内の過去予測と最新株価",
    engine: "判定時の価格と最新価格の比較、Hit / Miss・保有期間別リターン計算",
    output: "全体的中率、判定別成功率、平均リターン、信頼性の手がかり",
    safety: "評価対象期間と更新日時を確認して、数字を文脈とともに読む",
    intro: "エンジンの判断を一方向に信じるのではなく、過去にどれだけ機能したかを検証するためのページです。予測を出す画面ではなく、予測の後ろ姿を追跡する画面として位置づけます。",
    steps: [
      "ナビゲーションから過去の予測実績を開きます。",
      "最新株価で検証・更新を実行し、判定時の価格と現在価格を比較します。",
      "各予測を Hit / Miss として確認します。",
      "全体の的中率、BUY・AVOID別の成功率、保有期間ごとの平均リターンを読みます。",
    ],
    outputs: [
      { label: "Hit / Miss", detail: "過去の予測が、その後の価格推移に対して成功したかを確認。" },
      { label: "判定別の精度", detail: "BUYとAVOIDを分け、同じ数字に混ぜずに評価。" },
      { label: "平均リターン", detail: "保有期間の違いを踏まえて、結果の傾向を比較。" },
    ],
    notes: ["過去の実績は将来の結果を保証するものではありません。", "更新時点と評価期間を揃えて読むと、数字の意味を取り違えにくくなります。"],
  },
  {
    number: "05",
    slug: "macro-timeline",
    name: "マクロイベント履歴",
    en: "Macro Timeline",
    short: "数字の変化を、出来事の流れで読む。",
    promise: "G20のマクロ指標と市場イベントを時系列に置き、判断の背景を振り返る。",
    icon: LineChart,
    image: timelineImage,
    accent: "cobalt",
    input: "インフレ、金利、為替、GDP、エネルギーなどのマクロ指標",
    engine: "イベントの検出、指標の推移、セクターや銘柄への影響整理",
    output: "イベント時系列、マクロ指標チャート、現在の市場コンテキスト",
    safety: "個別の値だけでなく、変化の方向と発生したイベントを併読する",
    intro: "市場の変化を、一枚の数値や一つのニュースに分解せず、時系列の流れとして読むためのモードです。イベントがいつ起き、どの指標が動き、どの判断に影響したのかを振り返るための研究トレイルをつくります。",
    steps: [
      "対象国・地域のマクロ指標を表示します。",
      "インフレ、金利、為替、GDP、原油など、関心のある指標の推移を確認します。",
      "イベント履歴とチャートを照合し、変化の方向とタイミングを読みます。",
      "スクリーナーやアラートの判断が、どの環境を前提にしているかを確認します。",
    ],
    outputs: [
      { label: "マクロ指標の流れ", detail: "指標を単発の値ではなく、時間の中の変化として把握。" },
      { label: "イベントの文脈", detail: "CPI、金利、為替、エネルギーなどの変化を判断背景として整理。" },
      { label: "判断への接続", detail: "スクリーニングや通知が反応した環境を、後から読み返せる。" },
    ],
    notes: ["イベントの影響は市場やセクターによって異なります。", "タイムラインは、他のモードの結果を説明する補助線として使うと有効です。"],
  },
  {
    number: "06",
    slug: "alerts",
    name: "通知・アラート設定",
    en: "Alert Settings",
    short: "変化を待つのではなく、条件を決めて受け取る。",
    promise: "G20マクロイベントを検出し、保存ポートフォリオを再評価して、設定済みの条件で知らせる。",
    icon: Bell,
    accent: "vermillion",
    input: "監視状態、通知チャンネル、重大度、イベント種別、頻度",
    engine: "マクロイベント検出、ポートフォリオ再評価、通知レポート生成",
    output: "Email / Telegram通知、配信ステータス、送信ログ",
    safety: "通知条件と配信ログを確認し、受け取ったアラートの前提を追跡する",
    intro: "インフレ高進、長期金利急騰、原油ショックなどの突変が起きたとき、保存されたポートフォリオを再評価し、必要な通知を送るための運用モードです。通知そのものより、何を条件に知らせるかの設計が中心になります。",
    steps: [
      "サイドバーの自動監視（Active Monitoring）を有効にします。",
      "EmailまたはTelegramの通知チャンネルを選び、必要な認証情報を設定します。",
      "最小重大度、イベント種別、通知頻度（即時・日次・週次）を設定します。",
      "画面下部の配信ログで、送信先・ステータス・タイムスタンプを確認します。",
    ],
    outputs: [
      { label: "イベントフィルター", detail: "CPI、FOMC、GDP、Rate Hike、Oil Spike、FX Shockなどから選択。" },
      { label: "通知頻度", detail: "Instant、Daily Digest、Weekly Digestを用途に応じて切り替え。" },
      { label: "配信ログ", detail: "送信先チャンネル、配信ステータス、タイムスタンプを履歴で確認。" },
    ],
    notes: ["通知の精度は、重大度とイベント種別を絞るほど運用しやすくなります。", "メール・Telegramの接続情報は、利用環境の設定と安全性を確認したうえで扱ってください。"],
  },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Stock Engine Guide ホーム">
      <img src={markImage} alt="" className="brand-mark" />
      {!compact && <span><strong>STOCK ENGINE</strong><small>FIELD GUIDE</small></span>}
    </Link>
  );
}

function Rail({ open, setOpen, onSearch }: { open: boolean; setOpen: (value: boolean) => void; onSearch: () => void }) {
  const [location] = useLocation();
  return (
    <>
      <div className={`rail-backdrop ${open ? "is-open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`rail ${open ? "is-open" : ""}`}>
        <div className="rail-top"><Brand /><button className="icon-button rail-close" onClick={() => setOpen(false)} aria-label="メニューを閉じる"><X size={19} /></button></div>
        <div className="rail-label">INDEX / 06 MODES</div>
        <button className="rail-search" onClick={onSearch}><Search size={14} />サイト内検索 <span>⌘ K</span></button>
        <nav className="mode-nav" aria-label="モード一覧">
          <Link href="/" className={location === "/" ? "active" : ""} onClick={() => setOpen(false)}><span className="nav-num">00</span><span>全体像</span><ChevronRight size={14} /></Link>
          {modes.map((mode) => {
            const Icon = mode.icon;
            return <Link key={mode.slug} href={`/modes/${mode.slug}`} className={location === `/modes/${mode.slug}` ? "active" : ""} onClick={() => setOpen(false)}><span className="nav-num">{mode.number}</span><Icon size={15} /><span>{mode.name}</span><ChevronRight size={14} /></Link>;
          })}
        </nav>
        <div className="rail-bottom">
          <div className="rail-note"><Sparkles size={16} /><span>Stock Engineを<br />読むための索引</span></div>
          <div className="rail-version">GUIDE / V1.0<br />SOURCE: STOCK-ENGINE</div>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  return <header className="mobile-header"><button className="icon-button" onClick={onMenu} aria-label="メニューを開く"><Menu size={20} /></button><Brand compact /><span className="mobile-header-label">FIELD GUIDE / 2026</span><button className="header-search" onClick={onSearch}><Search size={16} />検索</button></header>;
}

function SectionTag({ children, tone = "cobalt" }: { children: string; tone?: string }) {
  return <span className={`section-tag ${tone}`}>{children}</span>;
}

function Term({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const item = glossary[name];
  if (!item) return <span>{name}</span>;
  return <span className="term-wrap"><button className="term-trigger" onClick={() => setOpen(!open)} aria-expanded={open}>{item.term}<span>?</span></button>{open && <span className="term-popover" role="status"><strong>{item.term}</strong><span>{item.definition}</span><button onClick={() => setOpen(false)} aria-label="用語解説を閉じる"><X size={13} /></button></span>}</span>;
}

function GlossaryStrip({ mode }: { mode: Mode }) {
  return <section className="glossary-strip"><div><SectionTag>KEY TERMS</SectionTag><p>本文を読む前に、専門用語の意味を確認できます。</p></div><div className="term-list">{modeGlossary[mode.slug].map((name) => <Term key={name} name={name} />)}</div></section>;
}

const flowNodes = [
  { id: "macro", number: "00", title: "マクロ環境", detail: "インフレ・金利・為替・GDP", type: "source" },
  { id: "screen", number: "01", title: "マーケットスクリーナー", detail: "市場と銘柄を評価", type: "mode" },
  { id: "portfolio", number: "02", title: "ポートフォリオ分析", detail: "保有比率と逆風を診断", type: "mode" },
  { id: "paper", number: "03", title: "仮想取引ハブ", detail: "シナリオを試す", type: "mode" },
  { id: "verify", number: "04", title: "自己検証ボード", detail: "予測を実績と照合", type: "mode" },
  { id: "timeline", number: "05", title: "マクロイベント履歴", detail: "変化を時系列で読む", type: "mode" },
  { id: "alerts", number: "06", title: "通知・アラート設定", detail: "条件で再評価・通知", type: "mode" },
];

function FlowDiagram() {
  const [active, setActive] = useState("macro");
  const selected = flowNodes.find((node) => node.id === active) ?? flowNodes[0];
  const links: Record<string, string[]> = { macro: ["screen", "portfolio", "timeline", "alerts"], screen: ["portfolio", "paper", "verify"], portfolio: ["paper", "alerts"], paper: ["verify"], verify: ["screen"], timeline: ["screen", "alerts"], alerts: ["portfolio", "timeline"] };
  return <section className="flow-diagram-section"><div className="flow-heading"><div><SectionTag>INTERACTIVE DATA FLOW</SectionTag><h2>6つのモードは、<br /><em>循環する。</em></h2></div><p>ノードを選択すると、そのモードがどのデータを受け取り、どこへ返すのかを強調表示します。Stock Engineは、評価して終わるのではなく、検証と通知を経て再び判断へ戻る構造です。</p></div><div className="flow-diagram"><div className="flow-axis" /><div className="flow-nodes">{flowNodes.map((node) => <button key={node.id} className={`flow-node ${node.type} ${active === node.id ? "selected" : ""} ${links[active]?.includes(node.id) ? "connected" : ""}`} onClick={() => setActive(node.id)}><span>{node.number}</span><strong>{node.title}</strong><small>{node.detail}</small></button>)}</div><div className="flow-detail"><SectionTag tone={selected.type === "source" ? "vermillion" : "cobalt"}>{selected.type === "source" ? "SOURCE" : `MODE ${selected.number}`}</SectionTag><h3>{selected.title}</h3><p>{selected.detail}。{selected.id === "macro" ? "ここからスクリーナー、ポートフォリオ、履歴、アラートへ経済環境が配られます。" : "選択したノードから青くつながるモードが、次にデータを受け取る接続先です。"}</p>{selected.type !== "source" && <Link href={`/modes/${modes[Number(selected.number) - 1]?.slug ?? "market-screener"}`} className="flow-detail-link">このモードを読む <ArrowUpRight size={15} /></Link>}</div></div></section>;
}

function Landing() {
  return <div className="site-shell">
    <div className="hero-band" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,25,35,.98) 0%, rgba(16,25,35,.84) 44%, rgba(16,25,35,.26) 100%), url(${heroImage})` }}>
      <div className="hero-content">
        <div className="eyebrow light"><span>STOCK ENGINE / FIELD GUIDE</span><span>DOCUMENTATION · 2026</span></div>
        <div className="hero-grid">
          <div>
            <p className="hero-kicker">市場を読む前に、<br /><em>判断経路</em>を読む。</p>
            <h1>Stock<br /><span>Engine</span></h1>
            <p className="hero-lead">マクロ経済の変化を、銘柄・ポートフォリオ・通知へ接続する分析サービス。その6つのモードを、ひとつの地図として解説します。</p>
            <Link href="/modes/market-screener" className="primary-link">最初の章を読む <ArrowUpRight size={16} /></Link>
          </div>
          <div className="hero-index"><span>INDEX</span><strong>06</strong><small>MODES<br />ONE ENGINE</small></div>
        </div>
      </div>
    </div>
    <main className="home-main">
      <div className="section-intro"><div><SectionTag>ABOUT THE ENGINE</SectionTag><h2>ひとつのサービスを、<br /><em>6つの視点</em>から。</h2></div><p>Stock Engineは、マクロ経済の動向を読み解き、その影響を監視銘柄や保有ポートフォリオへつなげるための分析エンジンです。ここでは、画面を機能の羅列ではなく、入力から判断、検証、通知へつながる一連の運用として読み解きます。</p></div>
      <div className="engine-flow"><div className="flow-line" />{["INPUT", "ENGINE", "DECISION", "VERIFY", "ACT"].map((label, i) => <div className="flow-step" key={label}><span>0{i + 1}</span><strong>{label}</strong><small>{["市場・保有データ", "マクロ評価", "銘柄と配分", "実績を検証", "通知・再評価"][i]}</small></div>)}</div>
      <FlowDiagram />
      <div className="chapter-heading"><div><SectionTag>CHAPTERS / 06</SectionTag><h2>モードを選ぶ</h2></div><p>気になる章から読み始めても、01から順に読んでも構いません。各ページは「何を入れ、どう処理し、何が出るか」を同じ構成で記載しています。</p></div>
      <div className="mode-list">{modes.map((mode) => <ModeCard key={mode.slug} mode={mode} />)}</div>
      <div className="closing-note"><ShieldCheck size={20} /><div><SectionTag tone="vermillion">READ WITH CONTEXT</SectionTag><p>このガイドは、ZIP内のREADME・HOWTO・ソースコードに記載された挙動をもとに構成しています。市場データや投資判断に関する保証ではなく、サービスを正しく理解するためのドキュメントです。</p></div></div>
    </main>
  </div>;
}

function ModeCard({ mode }: { mode: Mode }) {
  const Icon = mode.icon;
  return <Link href={`/modes/${mode.slug}`} className="mode-card"><div className={`mode-card-number ${mode.accent}`}>{mode.number}</div><div className="mode-card-body"><div className="mode-card-top"><Icon size={18} /><span>{mode.en}</span></div><h3>{mode.name}</h3><p>{mode.short}</p><span className="read-more">章を読む <ArrowUpRight size={15} /></span></div>{mode.image && <img src={mode.image} alt="" />}</Link>;
}

function ModePage({ mode }: { mode: Mode }) {
  const Icon = mode.icon;
  const next = modes[(Number(mode.number) % modes.length)];
  return <div className="site-shell mode-shell">
    <main className="mode-main">
      <div className="mode-breadcrumb"><Link href="/">00 / 全体像</Link><ChevronRight size={14} /><span>{mode.number} / {mode.name}</span></div>
      <div className="atlas-spine" aria-label="アトラス索引"><span>ATLAS SPINE</span>{modes.map((chapter) => <Link key={chapter.slug} href={`/modes/${chapter.slug}`} className={chapter.slug === mode.slug ? "active" : ""}><b>{chapter.number}</b><small>{chapter.name}</small></Link>)}</div>
      <div className="mode-hero">
        <div className="mode-meta"><span className={`chapter-number ${mode.accent}`}>{mode.number}</span><SectionTag tone={mode.accent}>{mode.en}</SectionTag><div className="mode-icon"><Icon size={24} /></div></div>
        <div className="mode-title-block"><p className="mode-kicker">{mode.short}</p><h1>{mode.name}</h1><p className="mode-intro">{mode.intro}</p></div>
        {mode.image && <img className="mode-hero-image" src={mode.image} alt="" />}
      </div>
      <div className="mode-spec-grid"><Spec label="INPUT" value={mode.input} /><Spec label="ENGINE" value={mode.engine} /><Spec label="OUTPUT" value={mode.output} /><Spec label="SAFETY" value={mode.safety} tone="vermillion" /></div>
      <GlossaryStrip mode={mode} />
      <div className="mode-content-grid"><aside className="content-aside"><SectionTag>FIELD NOTES</SectionTag><p>{mode.promise}</p><div className="aside-rule" /><span className="aside-caption">MODE {mode.number}<br />SOURCE-BASED GUIDE</span></aside><div className="mode-content"><section><div className="content-heading"><span>01</span><div><SectionTag>HOW IT WORKS</SectionTag><h2>使い方の流れ</h2></div></div><div className="step-list">{mode.steps.map((step, i) => <div className="step" key={step}><span>{String(i + 1).padStart(2, "0")}</span><p>{step}</p></div>)}</div></section><section><div className="content-heading"><span>02</span><div><SectionTag>WHAT YOU GET</SectionTag><h2>このモードから得られるもの</h2></div></div><div className="output-list">{mode.outputs.map((output, i) => <div className="output" key={output.label}><span>0{i + 1}</span><div><h3>{output.label}</h3><p>{output.detail}</p></div></div>)}</div></section><section className="notes-section"><div className="content-heading"><span>03</span><div><SectionTag tone="vermillion">BOUNDARIES</SectionTag><h2>読むときの注意</h2></div></div><div className="notes">{mode.notes.map((note) => <div key={note}><CheckCircle2 size={16} /><p>{note}</p></div>)}</div></section></div></div>
      <div className="next-chapter"><div><span>NEXT CHAPTER</span><strong>{next.number} / {next.name}</strong></div><Link href={`/modes/${next.slug}`}><ArrowUpRight size={20} /></Link></div>
    </main>
  </div>;
}

function Spec({ label, value, tone = "cobalt" }: { label: string; value: string; tone?: string }) { return <div className="spec"><SectionTag tone={tone}>{label}</SectionTag><p>{value}</p></div>; }

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const modeResults = modes.filter((mode) => [mode.name, mode.en, mode.short, mode.intro, mode.promise, ...mode.steps, ...mode.outputs.map((output) => output.label)].join(" ").toLowerCase().includes(normalized));
  const termResults = Object.values(glossary).filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(normalized));
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="サイト内検索"><div className="search-panel"><div className="search-panel-top"><SectionTag>SEARCH / FIELD GUIDE</SectionTag><button className="icon-button" onClick={onClose} aria-label="検索を閉じる"><X size={20} /></button></div><div className="search-input-wrap"><Search size={19} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="モード、用語、機能を検索" /><kbd>ESC</kbd></div>{query && <div className="search-results"><div className="search-result-label">{modeResults.length + termResults.length} RESULTS</div>{modeResults.map((mode) => <Link key={mode.slug} href={`/modes/${mode.slug}`} onClick={onClose} className="search-result"><span>{mode.number}</span><div><strong>{mode.name}</strong><small>{mode.short}</small></div><ArrowUpRight size={15} /></Link>)}{termResults.map((item) => <div key={item.term} className="search-result term-result"><span>?</span><div><strong>{item.term}</strong><small>{item.definition}</small></div></div>)}{modeResults.length === 0 && termResults.length === 0 && <p className="search-empty">一致するページや用語がありません。</p>}</div>}{!query && <div className="search-hint"><span>TRY SEARCHING</span><p>「マクロ」「CSV」「アラート」「ポートフォリオ」などを入力してください。</p></div>}</div></div>;
}

function AppRouter() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return <><Header onMenu={() => setMenuOpen(true)} onSearch={() => setSearchOpen(true)} /><Rail open={menuOpen} setOpen={setMenuOpen} onSearch={() => setSearchOpen(true)} />{searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}<div className="desktop-page"><Switch><Route path="/" component={Landing} />{modes.map((mode) => <Route key={mode.slug} path={`/modes/${mode.slug}`}>{() => <ModePage mode={mode} />}</Route>)}<Route component={Landing} /></Switch></div></>;
}

export default function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router base="/stockengine"><AppRouter /></Router></TooltipProvider></ThemeProvider></ErrorBoundary>; }
