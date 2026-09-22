import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Database,
  Expand,
  FileCheck2,
  Fullscreen,
  Grid2X2,
  Landmark,
  Layers3,
  Network,
  Printer,
  ShieldCheck,
  TrendingUp,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

const SOURCE = "Источники: BCB / CMN / CVM / SUSEP / PREVIC / B3; нормативная база и данные датированы на слайдах";
const SEGMENTATION_SOURCE = "Источник: Resolução CMN nº 4.553/2017, редакция с изменениями по Resolução CMN nº 5.194/2024";
const CAPITAL_REFORM_SOURCE = "Источник: Resolução Conjunta nº 14 и Resolução BCB nº 517 от 03.11.2025; переходные положения — до 2028 г.";
const BASEL_SOURCE = "Источник: Basel Committee, Basel III framework; уровни показаны как международная базовая рамка BCBS";
const CONCENTRATION_SOURCE = "Источник: BCB, Relatório de Economia Bancária 2023; данные на конец 2023 г.";

type Section = "regulation" | "payments" | "banks" | "capital" | "markets";

type SlideDef = {
  title: string;
  section: Section;
  content: ReactNode;
  source?: string;
};

const sectionLabel: Record<Section, string> = {
  regulation: "SFN / REGULATION",
  payments: "FX / PAYMENTS",
  banks: "BANKING SYSTEM",
  capital: "BASEL / CAPITAL",
  markets: "CAPITAL MARKETS",
};

function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "green" | "gold" | "teal" | "risk" }) {
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

function Node({ children, tone = "navy", compact = false, title }: { children: ReactNode; tone?: string; compact?: boolean; title?: string }) {
  return (
    <div className={`diagram-node node-${tone} ${compact ? "node-compact" : ""}`} title={title} tabIndex={title ? 0 : undefined}>
      {children}
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return vertical ? <ArrowDown className="flow-arrow" aria-hidden /> : <ChevronRight className="flow-arrow" aria-hidden />;
}

function Metric({ value, label, tone = "navy" }: { value: string; label: string; tone?: string }) {
  return (
    <div className={`metric metric-${tone}`}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Card({ icon: Icon, title, children, tone = "navy" }: { icon?: LucideIcon; title: string; children: ReactNode; tone?: string }) {
  return (
    <div className={`content-card card-${tone}`}>
      <div className="card-title">{Icon && <Icon aria-hidden />}<strong>{title}</strong></div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function SlideFrame({ index, slide }: { index: number; slide: SlideDef }) {
  return (
    <article className={`slide-content section-${slide.section}`} aria-label={`Слайд ${index + 1}: ${slide.title}`}>
      <header className="slide-header">
        <div className="section-mark"><span>{String(index + 1).padStart(2, "0")}</span>{sectionLabel[slide.section]}</div>
        <div className="deck-label">BRAZIL | FINANCIAL SYSTEM | 2026</div>
      </header>
      <main className="slide-main">{slide.content}</main>
      <footer className="slide-footer">
        <span>{slide.source ?? "Brazil Financial System · analytical deck"}</span>
        <span>{String(index + 1).padStart(2, "0")} / 24</span>
      </footer>
    </article>
  );
}

function Title({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return <div className="title-block">{kicker && <p className="slide-kicker">{kicker}</p>}<h2 className="slide-title">{children}</h2></div>;
}

const regulatorRows = [
  ["CMN", "Общая финансовая политика и нормативная база", "Resoluções CMN"],
  ["BCB", "Банки, платежи, FX, пруденциальный надзор", "Лицензии, нормативы, надзор"],
  ["CVM", "Рынок ценных бумаг", "Эмитенты, фонды, брокеры, предложения"],
  ["CNSP", "Политика страхования", "Нормативы страхового рынка"],
  ["SUSEP", "Страхование, открытая пенсия, капитализация", "Лицензирование и надзор"],
  ["PREVIC", "Закрытые пенсионные фонды", "Лицензирование и надзор EFPC"],
  ["CADE", "Конкуренция", "M&A, концентрация, антимонопольный контроль"],
  ["B3", "Рыночная инфраструктура", "Торговля, клиринг, регистрация, листинг"],
];

const slides: SlideDef[] = [
  {
    title: "Финансовая система Бразилии",
    section: "regulation",
    content: <div className="cover-layout">
      <div className="cover-copy reveal">
        <Tag tone="green">REGULATION · RISK · CAPITAL · LICENSE</Tag>
        <h1 className="slide-title-lg">Финансовая система Бразилии</h1>
        <p className="slide-subtitle">Регулирование • банки • платежи • FX • капитал • рынок ценных бумаг</p>
        <p className="cover-deck">Как устроена система и как государство контролирует её устойчивость</p>
      </div>
      <div className="brazil-map reveal delay-1" aria-label="Карта архитектуры финансовой системы Бразилии">
        <svg viewBox="0 0 520 500" role="img" aria-label="Контур Бразилии">
          <path d="M157 35l68 8 34 45 67 13 45 48-17 53 27 39-26 44-18 77-52 36-33 67-52-30-11-65-57-32-5-55-44-29 18-66-31-44 48-42z" />
        </svg>
        <div className="map-node mn-1">CMN</div><div className="map-node mn-2">BCB</div><div className="map-node mn-3">CVM</div><div className="map-node mn-4">SUSEP</div><div className="map-node mn-5">PREVIC</div><div className="map-node mn-6">B3</div>
        <div className="map-node mn-7">BANKS</div><div className="map-node mn-8">FINTECH</div><div className="map-node mn-9">FX</div><div className="map-node mn-10">PAYMENTS</div>
      </div>
      <div className="cover-year">2026 <span /> BRAZIL FINANCIAL SYSTEM</div>
    </div>,
  },
  {
    title: "От Banco do Brasil до Pix и цифрового финансового рынка",
    section: "regulation",
    source: SOURCE,
    content: <><Title kicker="HOW THE SYSTEM EVOLVED">От Banco do Brasil до Pix и цифрового финансового рынка</Title>
      <div className="timeline reveal">
        {[
          ["1808", "Banco do Brasil"], ["1964", "Создание BCB и реформа SFN"], ["1967", "Современная структура SFN"], ["1994", "Plano Real"], ["1999", "Плавающий FX + инфляционное таргетирование"], ["2013", "Basel III"], ["2020", "Pix"], ["2021", "Open Finance"], ["2021–22", "Lei 14.286: новая FX-база"], ["2025", "Новая методика капитала"], ["2025–26", "Усиление правил digital finance"],
        ] as const).map(([year, text], i) => <div className="timeline-item" key={year + text}><span>{i + 1}</span><strong>{year}</strong><p>{text}</p></div>)}
      </div>
      <div className="statement reveal delay-2">От классической банковской модели — к высокоцифровизированной системе с сильным пруденциальным надзором.</div>
    </>,
  },
  {
    title: "Национальная финансовая система Бразилии — SFN",
    section: "regulation",
    source: SEGMENTATION_SOURCE,
    content: <><Title kicker="HOW THE SYSTEM IS BUILT">Национальная финансовая система Бразилии — SFN</Title>
      <div className="architecture-grid reveal">
        <div className="architecture-level"><span>НОРМАТИВНАЯ ПОЛИТИКА</span><Node tone="gold">CMN<small>Conselho Monetário Nacional</small></Node><Node tone="gold">CNSP<small>Страховая политика</small></Node></div>
        <div className="architecture-level"><span>НАДЗОР</span><Node>BCB<small>Банки · платежи · FX</small></Node><Node tone="green">CVM<small>Ценные бумаги</small></Node><Node tone="teal">SUSEP<small>Страхование</small></Node><Node tone="teal">PREVIC<small>Закрытые пенсии</small></Node><Node tone="muted">CADE<small>Конкуренция</small></Node></div>
        <div className="architecture-level participants"><span>УЧАСТНИКИ</span>{["BANKS","PAYMENT INSTITUTIONS","FINTECHS","INSURERS","PENSION FUNDS","BROKERS","ASSET MANAGERS","FUNDS"].map(x=><Node compact key={x}>{x}</Node>)}</div>
        <div className="architecture-level infra"><span>ИНФРАСТРУКТУРА</span><Node tone="green">B3</Node><Node tone="muted">CLEARING</Node><Node tone="muted">CUSTODY</Node><Node tone="muted">REGISTRATION</Node></div>
      </div>
      <p className="insight-line">Один участник может попадать под несколько регуляторов — в зависимости от выполняемой деятельности.</p>
    </>,
  },
  {
    title: "Кто что регулирует?",
    section: "regulation",
    source: SOURCE,
    content: <><Title kicker="WHO REGULATES IT">Кто что регулирует?</Title>
      <div className="two-col wide-left reveal"><div className="data-table compact-table"><div className="table-row table-head"><span>Регулятор</span><span>Что регулирует</span><span>Инструменты</span></div>{regulatorRows.map(r=><div className="table-row" key={r[0]}><strong>{r[0]}</strong><span>{r[1]}</span><span>{r[2]}</span></div>)}</div>
      <div className="vertical-flow">{["RULES","LICENSE","REPORTING","SUPERVISION","SANCTIONS"].map((x,i)=><div key={x}><Node tone={i===1?"gold":i===4?"risk":"navy"}>{x}</Node>{i<4&&<Arrow vertical/>}</div>)}</div></div>
    </>,
  },
  {
    title: "Регулирование строится вокруг деятельности и риска",
    section: "regulation",
    content: <><Title kicker="REGULATORY LENS">Регулирование строится вокруг деятельности и риска</Title>
      <div className="flow-steps reveal">{[
        ["01 · КТО ТЫ?","Bank · Payment Institution · Broker · Fintech · Insurer"],
        ["02 · ЧТО ДЕЛАЕШЬ?","Payments · Lending · Deposits · FX · Investments · Custody"],
        ["03 · КАКОЙ МАСШТАБ?","S1 → S2 → S3 → S4 → S5"],
        ["04 · КАКИЕ РИСКИ?","Credit · Market · Liquidity · Operational · Cyber · AML"],
        ["05 · КАКИЕ ТРЕБОВАНИЯ?","Capital · Liquidity · Governance · Reporting"],
        ["06 · ЧТО КОНТРОЛИРУЮТ?","Authorization · Supervision · Inspection · Enforcement"],
      ].map(([a,b],i)=><div className="flow-step" key={a}><span>{a}</span><strong>{b}</strong>{i<5&&<Arrow/>}</div>)}</div>
      <div className="statement">Чем выше масштаб, сложность и системная значимость — тем строже регулирование.</div>
    </>,
  },
  {
    title: "S1–S5: чем крупнее и сложнее институт, тем выше требования",
    section: "regulation",
    source: SOURCE,
    content: <><Title kicker="S1–S5 = PRUDENTIAL SEGMENTATION">S1–S5: масштаб определяет глубину требований</Title>
      <div className="segmentation reveal"><div className="stairs">{[
        ["S5","Особый упрощённый режим","Для отвечающих критериям малых и низкосложных организаций; не диапазон по доле ВВП"],
        ["S4","< 0,1% PIB","Значительно упрощённая prudential framework"],
        ["S3","0,1–1% PIB","Упрощения по отдельным рискам"],
        ["S2","1–10% PIB","Basel с отдельными упрощениями"],
        ["S1","≥ 10% PIB","Полное соответствие Basel / значимая международная деятельность"],
      ].map(([s,p,d],i)=><div className={`stair stair-${i+1}`} key={s}><strong>{s}</strong><span>{p}</span><small>{d}</small></div>)}</div>
      <div className="type-panel"><Tag tone="teal">ОТДЕЛЬНЫЙ РЕЖИМ</Tag>{[["TYPE 1","Финансовая организация или конгломерат с платёжной деятельностью"],["TYPE 2","Платёжная группа без финансовой организации"],["TYPE 3","Платёжная группа, куда входит финансовая организация"]].map(x=><div className="type-row" key={x[0]}><strong>{x[0]}</strong><span>{x[1]}</span></div>)}<div className="warning-note">Платёжные институты исключены из S1–S5 и регулируются отдельными нормами BCB. S1–S5 ≠ FX.</div></div></div>
    </>,
  },
  {
    title: "FX Market: как регулируется валютный рынок?",
    section: "payments",
    source: CAPITAL_REFORM_SOURCE,
    content: <><Title kicker="FX REGULATION = CMN + BCB + AUTHORIZED PARTICIPANTS">FX Market: как регулируется валютный рынок?</Title>
      <div className="horizontal-chain reveal"><Node tone="gold">CMN<small>общие направления</small></Node><Arrow/><Node>BCB<small>лицензирование и контроль</small></Node><Arrow/><Node tone="teal">AUTHORIZED INSTITUTIONS<small>Banks · FX brokers · authorized FIs</small></Node><Arrow/><Node tone="green">FX OPERATIONS<small>Spot · Forward · Derivatives · Transfers · non-resident BRL</small></Node><Arrow/><Node tone="risk">CONTROLS<small>Reporting · AML/CFT</small></Node></div>
      <div className="law-grid"><Card title="Lei nº 14.286/2021" tone="green">Foreign Exchange and International Capital Law</Card><Card title="CMN Resolution 5.042/2022">Нормативная рамка валютного рынка</Card><Card title="BCB Resolution 277/2022" tone="teal">Операционные и отчётные правила</Card></div>
      <div className="pill-row">{["Гибкость операций","Единая логика","Электронная отчётность","Контроль потоков","AML/CFT"].map(x=><Tag key={x} tone="teal">{x}</Tag>)}</div>
    </>,
  },
  {
    title: "Доступ к валютному рынку — не отдельная FX-лицензия для всех",
    section: "payments",
    content: <><Title kicker="LICENSE">Доступ к валютному рынку — не отдельная «FX-лицензия для всех»</Title>
      <div className="license-map reveal"><div className="license-path"><Node tone="teal">COMPANY</Node><Arrow/><Node>Юридическая модель</Node><Arrow/><Node>Основная авторизация BCB</Node><Arrow/><Node tone="gold">Заявка на FX market</Node><Arrow/><Node tone="green">AUTHORIZATION</Node><Arrow/><Node tone="muted">Ongoing supervision</Node></div>
      <div className="review-box"><strong>BCB ПРОВЕРЯЕТ</strong><div className="check-grid">{["структуру","контролирующих лиц","источник капитала","финансовую устойчивость","бизнес-модель","governance","risk management","AML/CFT","IT / cyber","инфраструктуру"].map(x=><span key={x}><Check/> {x}</span>)}</div></div></div>
      <div className="statement">Прямые FX-операции доступны только участникам, авторизованным BCB.</div>
    </>,
  },
  {
    title: "Payments: где заканчивается fintech и начинается банковское регулирование?",
    section: "payments",
    content: <><Title kicker="DIGITAL DOES NOT MEAN UNREGULATED">Payments: где заканчивается fintech и начинается банковское регулирование?</Title>
      <div className="ecosystem reveal"><div className="tree"><Node tone="teal">FINTECH</Node><div className="tree-branches">{["Payment Institution","Bank","Payment Initiator","Acquirer","E-money Issuer","Credit Fintech","Infrastructure Provider"].map(x=><Node compact tone="muted" key={x}>{x}</Node>)}</div></div>
      <div className="feature-stack"><Card icon={CircleDollarSign} title="Pix" tone="green">Центральная платёжная инфраструктура BCB</Card><Card icon={Network} title="Open Finance" tone="teal">Обмен финансовыми данными с согласия клиента</Card><Card icon={ShieldCheck} title="AML/CFT + Cybersecurity">Контроль средств, устойчивость и защита пользователей</Card></div></div>
      <div className="insight-line">Цифровая бизнес-модель не освобождает от prudential, AML и operational требований.</div>
    </>,
  },
  {
    title: "2025: новый подход к минимальному капиталу",
    section: "capital",
    source: SOURCE,
    content: <><Title kicker="LATEST REGULATORY CHANGES · 2025–2026">2025: новый подход к минимальному капиталу</Title>
      <div className="before-after reveal"><div className="ba-panel muted"><Tag>ДО</Tag><strong>Юридический тип</strong><ArrowDown/><span>фиксированный минимум категории</span></div><ArrowRight className="big-arrow"/><div className="ba-panel gold"><Tag tone="gold">ПОСЛЕ</Tag><strong>Реальная деятельность</strong><ArrowDown/><span>риски + инфраструктура + funding + bank status</span></div></div>
      <div className="capital-formula"><strong>MINIMUM CAPITAL</strong><span>=</span>{["Базовый компонент","Разрешённые виды деятельности","Интенсивность IT","Привлечение ресурсов","Дополнительные факторы риска"].map((x,i)=><div key={x} className={i===4?"formula-bank":""}>{x}</div>)}</div>
      <div className="concept-contrast"><span>Minimum Capital</span><strong>≠</strong><span>Capital Adequacy Ratio</span><strong>≠</strong><span>Accounting Equity</span><strong>≠</strong><span>Minimum Paid-in Capital</span></div>
      <div className="quote">“Pay for the complexity you actually operate.”</div>
    </>,
  },
  {
    title: "Как изменились минимальные требования?",
    section: "capital",
    source: CAPITAL_REFORM_SOURCE,
    content: <><Title kicker="BEFORE / AFTER">Как изменились минимальные требования?</Title>
      <div className="two-col wide-left reveal"><div className="data-table"><div className="table-row table-head"><span>Организация</span><span>До реформы</span><span>Новая методика</span><span>Смысл</span></div>{[
        ["Банковские","Минимумы по типу","По деятельности","Сложность — ключевой фактор"],
        ["Payment Institutions","Ниже","Зависит от функций","IT и платежные функции"],
        ["Credit companies","Фиксированный подход","Activity-based","Зависит от операций"],
        ["Brokers / custodians","Фиксированный подход","Activity-based","Учитываются реальные функции"],
        ["С использованием “Bank”","—","+ R$30 млн","Дополнительный капитал"],
      ].map(r=><div className="table-row" key={r[0]}>{r.map((x,i)=>i===0?<strong key={x}>{x}</strong>:<span key={x}>{x}</span>)}</div>)}</div>
      <div className="kpi-stack"><Tag tone="gold">ЛОГИКА МЕТОДИКИ</Tag><Metric value="ACTIVITIES" label="Состав разрешённых операций влияет на расчёт" tone="gold"/><Metric value="RISK + INFRA" label="Учитываются риск-профиль и технологическая инфраструктура" tone="navy"/><p>Переходные положения для действующих организаций — <strong>до 2028 года</strong>.</p></div></div>
    </>,
  },
  {
    title: "Что именно пытается контролировать регулятор?",
    section: "capital",
    content: <><Title kicker="WHAT RISKS ARE CONTROLLED">Что именно пытается контролировать регулятор?</Title>
      <div className="risk-layout reveal"><div className="risk-grid">{[
        ["CREDIT RISK","Заёмщик не возвращает кредит"],["MARKET RISK","Изменение ставок, FX, цен активов"],["LIQUIDITY RISK","Обязательства нельзя выполнить вовремя"],["OPERATIONAL RISK","Ошибки, fraud, сбои"],["CYBER RISK","Атаки, утечки, компрометация"],["AML/CFT RISK","Отмывание денег и финансирование терроризма"],
      ] as const).map(([a,b],i)=><Card title={a} tone={i>2?"risk":"navy"} key={a}>{b}</Card>)}</div><div className="stability-core"><strong>CAPITAL</strong><span>+</span><strong>LIQUIDITY</strong><span>+</span><strong>GOVERNANCE</strong><span>+</span><strong>CONTROLS</strong><ArrowDown/><b>FINANCIAL STABILITY</b></div></div>
    </>,
  },
  {
    title: "Basel III: международный язык банковской устойчивости",
    section: "capital",
    source: BASEL_SOURCE,
    content: <><Title kicker="GLOBAL STANDARD → NATIONAL RULES">Basel III: международный язык банковской устойчивости</Title>
      <div className="two-col reveal"><div className="basel-timeline">{[["1988","BASEL I","8% capital / RWA"],["2004","BASEL II","Risk-sensitive capital + supervision"],["2010–17","BASEL III","Quality · buffers · liquidity · leverage"]].map((x,i)=><div className="basel-era" key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong><p>{x[2]}</p>{i<2&&<Arrow vertical/>}</div>)}</div>
      <div className="minimums"><Tag tone="gold">BASEL III MINIMUMS</Tag>{[["CET1","4,5% RWA"],["Tier 1","6%"],["Total Capital","8%"],["Conservation Buffer","2,5%"],["Leverage Ratio","3%"],["LCR","100%"],["NSFR","100%"]].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div></div>
      <div className="insight-line">Международная база BCBS: CET1 — базовый капитал 1-го уровня; RWA — активы, взвешенные по риску; LCR / NSFR — коэффициенты ликвидности; Leverage Ratio — коэффициент левереджа. В Бразилии применяются национальные нормы и буферы.</div>
    </>,
  },
  {
    title: "Из чего состоит банковский капитал?",
    section: "capital",
    content: <><Title kicker="CAPITAL WATERFALL">Из чего состоит банковский капитал?</Title>
      <div className="capital-layout reveal"><div className="capital-pyramid"><div className="pyr pyr-1"><strong>CET1</strong><span>основной капитал первого уровня</span><small>обыкновенные акции + резервы + retained earnings</small></div><div className="pyr pyr-2"><strong>TIER 1</strong><span>CET1 + Additional Tier 1</span></div><div className="pyr pyr-3"><strong>TOTAL REGULATORY CAPITAL</strong><span>Tier 1 + Tier 2</span></div></div>
      <div className="ratio-box"><Tag tone="gold">RWA</Tag><h3>Активы, взвешенные по риску</h3><div className="equation"><span>Capital Ratio</span><strong>=</strong><div><b>Regulatory Capital</b><hr/><b>RWA</b></div></div><p>Выше риск активов → больше необходимого капитала.</p></div></div>
      <div className="concept-contrast"><span>Регуляторный минимум капитала в R$</span><strong>≠</strong><span>Коэффициент достаточности капитала в % от RWA</span></div>
    </>,
  },
  {
    title: "Капитала недостаточно: банк должен иметь ликвидность",
    section: "capital",
    source: CONCENTRATION_SOURCE,
    content: <><Title kicker="LIQUIDITY + LEVERAGE">Капитала недостаточно: банк должен иметь ликвидность</Title>
      <div className="three-cards reveal"><Card title="LCR · 100%" icon={WalletCards} tone="green"><strong>Коэффициент покрытия ликвидностью</strong><p>Способность пережить стрессовый отток на горизонте 30 дней.</p></Card><Card title="NSFR · 100%" icon={Layers3} tone="gold"><strong>Коэффициент стабильного фондирования</strong><p>Соответствие стабильного фондирования долгосрочным активам.</p></Card><Card title="LEVERAGE · 3%" icon={TrendingUp}><strong>Коэффициент левереджа</strong><p>Tier 1 Capital / Total Exposure.</p></Card></div>
      <div className="statement"><strong>Capital adequacy ≠ liquidity adequacy.</strong> Хорошая капитализация не исключает кризис ликвидности.</div>
    </>,
  },
  {
    title: "Банковский сектор: государственные, частные и цифровые банки",
    section: "banks",
    source: SOURCE,
    content: <><Title kicker="WHO PARTICIPATES">Банковский сектор: государственные, частные и цифровые банки</Title>
      <div className="two-col wide-left reveal"><div className="data-table"><div className="table-row table-head"><span>Категория</span><span>Примеры</span><span>Роль</span></div>{[
        ["Государственные","Banco do Brasil · Caixa","Retail · ипотека · госпрограммы"],["Частные национальные","Itaú · Bradesco · BTG","Universal banking"],["Иностранные","Santander Brasil · международные группы","Corporate · retail · investment"],["Digital banks","Nubank · Inter · C6","Digital retail"],["Payment / fintech","PagSeguro · Stone · Mercado Pago","Payments · acquiring · fintech"],
      ].map(r=><div className="table-row" key={r[0]}><strong>{r[0]}</strong><span>{r[1]}</span><span>{r[2]}</span></div>)}</div>
      <div className="concentration"><Tag tone="green">RC4 · КОНЕЦ 2023</Tag><p>4 крупнейшие группы</p><Metric value="55,3%" label="активов" tone="green"/><Metric value="57,9%" label="депозитов" tone="navy"/><Metric value="57,8%" label="кредитов" tone="gold"/><small>Banco do Brasil · Itaú · Bradesco · Caixa. Не трактовать как долю 2026 года.</small></div></div>
    </>,
  },
  {
    title: "Разные бизнес-модели — единая prudential рамка",
    section: "banks",
    content: <><Title kicker="ONE PRUDENTIAL LOGIC">Разные бизнес-модели — единая prudential рамка</Title>
      <div className="three-columns reveal"><Card icon={Landmark} title="PUBLIC BANKS" tone="gold"><b>Banco do Brasil · Caixa</b><ul><li>retail</li><li>housing</li><li>agriculture</li><li>public programs</li><li>government-linked finance</li></ul></Card><Card icon={Building2} title="PRIVATE BANKS"><b>Itaú · Bradesco · BTG · Santander</b><ul><li>retail</li><li>corporate</li><li>investment banking</li><li>wealth</li><li>asset management</li></ul></Card><Card icon={WalletCards} title="DIGITAL / FINTECH" tone="green"><b>Nubank · Inter · C6 · PagSeguro · Stone</b><ul><li>mobile-first</li><li>payments</li><li>cards & lending</li><li>Open Finance</li><li>Pix</li></ul></Card></div>
      <div className="insight-line">Цифровая форма не отменяет пруденциального регулирования.</div>
    </>,
  },
  {
    title: "B3 + CVM: как работает рынок капитала",
    section: "markets",
    source: SOURCE,
    content: <><Title kicker="CVM = REGULATION · B3 = INFRASTRUCTURE">B3 + CVM: как работает рынок капитала</Title>
      <div className="market-flow reveal"><Node tone="green">COMPANY</Node><Arrow/><Node>IPO · FOLLOW-ON · DEBT · FUNDS</Node><Arrow/><Node tone="gold">CVM<small>regulation · disclosure · investor protection</small></Node><Arrow/><Node tone="green">B3<small>trading · clearing · settlement · depository · registration</small></Node><Arrow/><Node tone="muted">INVESTORS<small>retail · institutional · foreign</small></Node></div>
      <div className="market-bottom"><Card icon={TrendingUp} title="IBOVESPA B3" tone="green">Главный индикатор динамики наиболее торгуемых акций B3. Состав и веса меняются при ребалансировке.</Card><div className="weights"><Tag>КРУПНЫЕ КОМПОНЕНТЫ</Tag>{["Vale","Itaú Unibanco","Petrobras"].map(x=><span key={x}>{x}</span>)}<small>Без инвестиционных рекомендаций. Запрошенные данные «сентябрь 2026» не используются до официального подтверждения.</small></div></div>
    </>,
  },
  {
    title: "Как получить разрешение BCB?",
    section: "regulation",
    source: SOURCE,
    content: <><Title kicker="HOW A LICENSE IS OBTAINED">Как получить разрешение BCB?</Title>
      <div className="roadmap reveal">{[
        "Юридическая модель","Набор деятельности","Расчёт капитала","Корпоративная структура","Контролирующие лица и источник средств","Business Plan","Governance + risk","AML/CFT","IT + cyber + resilience","Application to BCB","BCB review","Authorization","Ongoing supervision",
      ].map((x,i)=><div className="roadmap-step" key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong></div>)}</div>
      <div className="insight-line"><b>Sisorf</b> — Manual de Organização do Sistema Financeiro — задаёт процедуры авторизации.</div>
    </>,
  },
  {
    title: "Authorization ≠ просто зарегистрировать компанию",
    section: "regulation",
    content: <><Title kicker="BCB DUE DILIGENCE">Authorization ≠ просто зарегистрировать компанию</Title>
      <div className="authorization-layout reveal"><div className="big-check"><FileCheck2/><strong>LICENSE</strong><span>Право безопасно вести регулируемую деятельность</span></div><div className="checklist">{["Capital","Economic & financial capacity","Source of funds","Controllers / shareholders","Corporate structure","Business plan","Governance","Internal controls","Risk management","AML/CFT","Cybersecurity","Operational capacity","Reporting infrastructure","Prudential compliance"].map(x=><span key={x}><Check/>{x}</span>)}</div></div>
      <div className="statement">Регулятор оценивает не только капитал, но и способность организации безопасно вести деятельность.</div>
    </>,
  },
  {
    title: "Бразилия vs Россия: две модели финансового регулирования",
    section: "markets",
    content: <><Title kicker="INSTITUTIONAL COMPARISON">Бразилия vs Россия: две модели финансового регулирования</Title>
      <div className="comparison-table reveal"><div className="compare-row compare-head"><span>Элемент</span><b>Бразилия</b><b>Россия</b></div>{[
        ["Центральный банк","Banco Central do Brasil","Банк России"],["Банковский надзор","BCB","Банк России"],["Ценные бумаги","CVM","Банк России"],["Страхование","SUSEP","Банк России"],["Частные пенсии","PREVIC: закрытый сегмент","Банк России"],["Биржевая инфраструктура","B3","Московская биржа"],["Фондовый индекс","Ibovespa","IMOEX"],["Платежи","Pix / SPB","НСПК / СБП"],["Prudential segmentation","S1–S5","По категориям"],["Basel","Через национальные нормы","Через нормативы Банка России"],
      ].map(r=><div className="compare-row" key={r[0]}>{r.map((x,i)=>i===0?<span key={x}>{x}</span>:<b key={x}>{x}</b>)}</div>)}</div>
      <div className="insight-line">Общая логика: капитал + ликвидность + управление рисками + надзор. Различаются архитектура и нормативы.</div>
    </>,
  },
  {
    title: "Как всё связано?",
    section: "markets",
    content: <><Title kicker="THE MASTER MAP">Как всё связано?</Title>
      <div className="master-map reveal">
        <Node tone="gold">CMN<small>ключевые рамки SFN</small></Node><Arrow vertical/>
        <div className="master-row"><Node title="BCB: банки, платежи, FX и пруденциальный надзор">BCB</Node><Node tone="green" title="CVM: регулирование рынка ценных бумаг">CVM</Node><Node tone="gold">CNSP</Node></div>
        <div className="master-links"><div><Arrow vertical/><div className="master-row"><Node compact>BANKS</Node><Node compact tone="teal">PAYMENTS</Node><Node compact tone="teal">FX</Node></div><Arrow vertical/><Node tone="gold">S1–S5 / PRUDENTIAL</Node><Arrow vertical/><Node tone="risk">CAPITAL + LIQUIDITY + RISK</Node></div>
        <div><Arrow vertical/><div className="master-row"><Node tone="teal" title="SUSEP: страхование, открытая частная пенсия и капитализация">SUSEP</Node><Node tone="teal" title="PREVIC: надзор за закрытыми пенсионными фондами">PREVIC</Node></div><Arrow vertical/><Node tone="green" title="B3: торговая, клиринговая, депозитарная и регистрационная инфраструктура">B3</Node><Arrow vertical/><Node tone="muted">STOCKS · BONDS · DERIVATIVES · IBOVESPA</Node></div></div>
      </div>
      <p className="hover-note">Наведите курсор или перейдите фокусом на BCB / CVM / SUSEP / PREVIC / B3, чтобы увидеть роль.</p>
    </>,
  },
  {
    title: "7 выводов о финансовой системе Бразилии",
    section: "markets",
    content: <><Title kicker="KEY TAKEAWAYS">7 выводов о финансовой системе Бразилии</Title>
      <div className="takeaways reveal">{[
        ["01","BCB — центральный узел банковского, платёжного и валютного регулирования."],["02","CMN задаёт ключевые нормативные рамки финансовой системы."],["03","CVM — ценные бумаги; SUSEP и PREVIC — страхование и пенсионные сегменты."],["04","S1–S5 — пропорциональная пруденциальная сегментация, а не валютная система."],["05","Basel III измеряет устойчивость через капитал, ликвидность и левередж."],["06","Реформа 2025: от типа организации — к деятельности, сложности и инфраструктуре."],["07","Pix, Open Finance и fintech встроены в строгую институциональную рамку."],
      ].map(x=><div key={x[0]}><span>{x[0]}</span><p>{x[1]}</p></div>)}</div>
      <div className="closing-quote">«Регулирование всё больше строится вокруг реального профиля риска, а не только юридического названия.»</div>
    </>,
  },
  {
    title: "Официальные источники",
    section: "markets",
    content: <><Title kicker="PRIMARY SOURCES">Официальные источники</Title>
      <div className="sources-grid reveal">{[
        ["ИНСТИТУТЫ","Banco Central do Brasil","Conselho Monetário Nacional (CMN)","Comissão de Valores Mobiliários (CVM)","SUSEP · PREVIC · B3"],
        ["НОРМАТИВНАЯ БАЗА","Lei nº 14.286/2021","Resolução CMN nº 5.042/2022","Resolução BCB nº 277/2022","Resolução Conjunta nº 14/2025","Resolução BCB nº 517/2025"],
        ["АНАЛИТИКА","BCB Financial Stability Report 2025/2026","BCB: prudential segmentation S1–S5","BCB: minimum capital methodology","B3: Ibovespa methodology and portfolio","BCBS: Basel III framework"],
      ].map(col=><div className="source-col" key={col[0]}><Tag tone="green">{col[0]}</Tag>{col.slice(1).map(x=><div key={x}><ArrowUpRight/><span>{x}</span></div>)}</div>)}</div>
      <div className="source-rule"><ShieldCheck/><div><strong>Принцип данных</strong><p>Дата указывается рядом с показателем. Неподтверждённые значения не заменяются оценкой.</p></div></div>
    </>,
  },
];

function IconButton({ label, onClick, children, disabled }: { label: string; onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return <button type="button" className="icon-button" onClick={onClick} disabled={disabled} aria-label={label} title={label}>{children}</button>;
}

export function BrazilFinanceDeck() {
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [scale, setScale] = useState(0.6);
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    setCurrent(bounded);
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(bounded + 1));
    url.searchParams.delete("print");
    window.history.replaceState({}, "", url);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = Number(params.get("slide"));
    if (Number.isFinite(requested) && requested >= 1 && requested <= slides.length) setCurrent(requested - 1);
    setPrintMode(params.has("print"));
  }, []);

  useEffect(() => {
    const resize = () => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      setScale(Math.min(rect.width / 1920, rect.height / 1080));
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.title = `${current + 1}/${slides.length} — ${slides[current]?.title ?? "Финансовая система Бразилии"}`;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest("button, a, input, textarea, select")) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") { event.preventDefault(); go(current + 1); }
      if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); go(current - 1); }
      if (event.key.toLowerCase() === "g") setOverview(v => !v);
      if (event.key === "Escape") setOverview(false);
      if (event.key === "Home") go(0);
      if (event.key === "End") go(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const printDeck = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("print", "1");
    window.history.replaceState({}, "", url);
    setPrintMode(true);
  };

  useEffect(() => {
    if (!printMode) return;
    const timer = window.setTimeout(() => window.print(), 120);
    const restore = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("print");
      window.history.replaceState({}, "", url);
      setPrintMode(false);
    };
    window.addEventListener("afterprint", restore, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("afterprint", restore);
    };
  }, [printMode]);

  const enterFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  };

  const stageStyle = useMemo(() => ({ "--deck-scale": scale } as CSSProperties), [scale]);
  if (printMode) return <div className="print-deck">{slides.map((slide, index) => <SlideFrame key={slide.title} index={index} slide={slide}/>)}</div>;

  const activeSlide = slides[current];
  if (!activeSlide) return null;

  return <div className="deck-app">
    <div className="deck-toolbar">
      <div className="toolbar-brand"><span>BR</span><div><b>BRAZIL FINANCIAL SYSTEM</b><small>Analytical presentation · 2026</small></div></div>
      <div className="toolbar-actions">
        <IconButton label="Обзор слайдов" onClick={() => setOverview(true)}><Grid2X2/></IconButton>
        <IconButton label="Печать или экспорт в PDF" onClick={printDeck}><Printer/></IconButton>
        <IconButton label="Полноэкранный режим" onClick={enterFullscreen}><Fullscreen/></IconButton>
      </div>
    </div>
    <div className="deck-stage" ref={stageRef} style={stageStyle}>
      <div className="slide-wrapper" key={current}><SlideFrame index={current} slide={activeSlide}/></div>
    </div>
    <div className="deck-controls">
      <IconButton label="Предыдущий слайд" onClick={() => go(current - 1)} disabled={current === 0}><ArrowLeft/></IconButton>
      <div className="progress-group"><div className="slide-count"><b>{String(current + 1).padStart(2,"0")}</b><span>/ {slides.length}</span></div><div className="progress-track"><span style={{ width: `${((current + 1) / slides.length) * 100}%` }}/></div><span>{activeSlide.title}</span></div>
      <IconButton label="Следующий слайд" onClick={() => go(current + 1)} disabled={current === slides.length - 1}><ArrowRight/></IconButton>
    </div>
    {overview && <div className="overview" role="dialog" aria-modal="true" aria-label="Обзор слайдов"><div className="overview-head"><div><b>ОБЗОР ПРЕЗЕНТАЦИИ</b><span>Выберите слайд</span></div><IconButton label="Закрыть обзор" onClick={() => setOverview(false)}><X/></IconButton></div><div className="overview-grid">{slides.map((slide,index)=><button key={slide.title} className={index===current?"active":""} onClick={()=>{go(index);setOverview(false)}}><div className="thumb-stage"><div className="thumb-slide"><SlideFrame index={index} slide={slide}/></div></div><span>{String(index+1).padStart(2,"0")} · {slide.title}</span></button>)}</div></div>}
  </div>;
}
