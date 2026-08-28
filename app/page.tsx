"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight, ArrowRight, Building2, Check, Clock3, Factory, Gauge,
  Home, Layers3, Menu, Phone, ShieldCheck, Snowflake, Sparkles,
  ThermometerSun, Warehouse, Wind, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const benefits = [
  { icon: Wind, number: "01", title: "Без швов и мостиков холода", text: "Пена повторяет форму поверхности и заполняет труднодоступные участки." },
  { icon: Gauge, number: "02", title: "Тонкий эффективный слой", text: "Нужный уровень теплоизоляции достигается при меньшей толщине конструкции." },
  { icon: ShieldCheck, number: "03", title: "Защита от влаги и шума", text: "Монолитное покрытие одновременно работает как тепло-, гидро- и шумоизоляция." },
  { icon: Clock3, number: "04", title: "Быстрый монтаж", text: "Большую площадь можно обработать за одну смену без сложной системы крепежа." },
];

const comparison = [
  { name: "Пенополиуретан", thickness: 50, width: "14%", accent: true },
  { name: "Пенополистирол", thickness: 130, width: "30%" },
  { name: "Минеральная вата", thickness: 150, width: "36%" },
  { name: "Дерево", thickness: 200, width: "47%" },
  { name: "Пенобетон", thickness: 300, width: "65%" },
  { name: "Кирпичная кладка", thickness: 700, width: "100%" },
];

const applications = [
  { icon: Home, title: "Частные дома", text: "Кровля, стены, фасады, мансарды и перекрытия" },
  { icon: Warehouse, title: "Ангары и склады", text: "Большие площади и металлоконструкции" },
  { icon: Factory, title: "Производства", text: "Цеха, холодильные камеры и резервуары" },
  { icon: Building2, title: "Коммерческие объекты", text: "Магазины, мастерские и сервисные здания" },
];

const steps = [
  ["01", "Заявка", "Уточняем объект, площадь и желаемый результат."],
  ["02", "Замер", "Осматриваем поверхность и рассчитываем толщину слоя."],
  ["03", "Подготовка", "Защищаем окна, коммуникации и соседние поверхности."],
  ["04", "Напыление", "Наносим ППУ и проверяем равномерность покрытия."],
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [area, setArea] = useState(120);
  const [thickness, setThickness] = useState(50);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  const estimate = useMemo(() => Math.round(area * 1100 * (thickness / 50)), [area, thickness]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setFormStatus("sending");
    setFormError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          website: data.get("website"),
          area,
          thickness,
          estimate,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(result?.error || "Не удалось отправить заявку");
      }

      setFormStatus("sent");
      form.reset();
    } catch (error) {
      setFormStatus("error");
      setFormError(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Теплоконтур — на главную">
          <span className="brand-mark"><Layers3 size={22} strokeWidth={2.4} /></span>
          <span>ТЕПЛОКОНТУР</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#advantages">Преимущества</a><a href="#applications">Объекты</a>
          <a href="#process">Как работаем</a><a href="#calculator">Расчёт</a>
        </nav>
        <div className="header-actions">
          <a className="phone-link" href="tel:+70000000000"><Phone size={17} /> +7 000 000-00-00</a>
          <Button asChild className="yellow-button header-cta"><a href="#calculator">Рассчитать стоимость</a></Button>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Мобильная навигация">
          <a href="#advantages" onClick={() => setMenuOpen(false)}>Преимущества</a>
          <a href="#applications" onClick={() => setMenuOpen(false)}>Объекты</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Как работаем</a>
          <a href="#calculator" onClick={() => setMenuOpen(false)}>Расчёт стоимости</a>
        </nav>}
      </header>

      <section className="hero" id="top">
        <div className="hero-image" aria-hidden="true" /><div className="hero-overlay" />
        <div className="hero-content section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Утепление напыляемым ППУ</div>
            <h1>Сохраняем тепло<br /><span>без швов</span> и лишних слоёв</h1>
            <p className="hero-lead">Профессионально утепляем дома, ангары и промышленные объекты. Подбираем толщину под конструкцию и климат, работаем под ключ.</p>
            <div className="hero-buttons">
              <Button asChild className="yellow-button hero-button"><a href="#calculator">Получить расчёт <ArrowRight /></a></Button>
              <a className="text-link" href="#advantages">Почему ППУ <ArrowDownRight size={18} /></a>
            </div>
          </div>
          <div className="hero-note">
            <div className="hero-note-icon"><ThermometerSun /></div>
            <div><strong>Один слой — три задачи</strong><span>Тепло · тишина · защита от влаги</span></div>
          </div>
        </div>
        <div className="hero-stats section-wrap">
          <div><strong>1 день</strong><span>средний срок монтажа</span></div>
          <div><strong>до 50 лет</strong><span>срок службы покрытия</span></div>
          <div><strong>любая форма</strong><span>без швов и крепежа</span></div>
        </div>
      </section>

      <section className="intro section-wrap" id="advantages">
        <div className="section-heading"><div className="eyebrow dark"><span /> Технология</div><h2>Утепление, которое становится частью конструкции</h2></div>
        <p className="section-intro">ППУ наносится прямо на основание и за секунды превращается в плотный монолитный слой. Он не требует каркаса, повторяет геометрию объекта и закрывает щели, через которые обычно уходит тепло.</p>
      </section>

      <section className="benefit-grid section-wrap">
        {benefits.map(({ icon: Icon, number, title, text }) => <article className="benefit-card" key={number}>
          <div className="benefit-top"><Icon /><span>{number}</span></div><h3>{title}</h3><p>{text}</p>
        </article>)}
      </section>

      <section className="comparison-section">
        <div className="section-wrap comparison-wrap">
          <div className="comparison-copy">
            <div className="eyebrow"><span /> Сравнение</div><h2>50 мм ППУ удерживают тепло как массивная кирпичная стена</h2>
            <p>Меньшая толщина утепления сохраняет полезную площадь и снижает нагрузку на конструкцию.</p>
            <div className="mini-points"><div><Snowflake /><span>Тепло зимой</span></div><div><ThermometerSun /><span>Прохлада летом</span></div></div>
          </div>
          <div className="comparison-chart" aria-label="Сравнение толщины материалов">
            {comparison.map(item => <div className={`bar-row ${item.accent ? "accent" : ""}`} key={item.name}>
              <div className="bar-label"><span>{item.name}</span><strong>{item.thickness} мм</strong></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: item.width }} /></div>
            </div>)}
            <p className="chart-caption">Иллюстративное сравнение эквивалентной теплоизоляции</p>
          </div>
        </div>
      </section>

      <section className="applications section-wrap" id="applications">
        <div className="section-heading split-heading"><div><div className="eyebrow dark"><span /> Где применяем</div><h2>От частного дома до промышленного цеха</h2></div><p>Напыляемая технология подходит для сложной геометрии, больших площадей и разных оснований.</p></div>
        <div className="application-grid">{applications.map(({ icon: Icon, title, text }, index) => <article className="application-card" key={title}>
          <div className="application-number">0{index + 1}</div><Icon /><h3>{title}</h3><p>{text}</p><ArrowDownRight className="application-arrow" />
        </article>)}</div>
      </section>

      <section className="process section-wrap" id="process">
        <div className="process-aside"><div className="eyebrow dark"><span /> Процесс</div><h2>Понятно на каждом этапе</h2><p>До начала работ вы знаете объём, толщину слоя и ориентировочную стоимость.</p></div>
        <div className="steps">{steps.map(([number, title, text]) => <article className="step" key={number}>
          <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check />
        </article>)}</div>
      </section>

      <section className="calculator-section" id="calculator">
        <div className="section-wrap calculator-wrap">
          <div className="calculator-copy">
            <div className="eyebrow"><span /> Быстрый расчёт</div><h2>Узнайте ориентировочный бюджет за минуту</h2>
            <p>Укажите площадь и предполагаемую толщину. Точную смету специалист подготовит после уточнения объекта.</p>
            <div className="calculator-trust"><Sparkles /><span>Расчёт демонстрационный — ставку легко заменить на актуальную</span></div>
          </div>
          <div className="calculator-card">
            <div className="control-group"><div className="control-label"><label>Площадь объекта</label><strong>{area} м²</strong></div>
              <Slider value={[area]} min={20} max={500} step={10} onValueChange={v => setArea(v[0])} aria-label="Площадь объекта" /><div className="range-labels"><span>20 м²</span><span>500 м²</span></div>
            </div>
            <div className="control-group"><div className="control-label"><label>Толщина слоя</label><strong>{thickness} мм</strong></div>
              <Slider value={[thickness]} min={30} max={100} step={10} onValueChange={v => setThickness(v[0])} aria-label="Толщина слоя" /><div className="range-labels"><span>30 мм</span><span>100 мм</span></div>
            </div>
            <div className="estimate"><span>Ориентировочная стоимость</span><strong>≈ {formatPrice(estimate)} ₽</strong><small>Материалы и работа · без учёта особенностей объекта</small></div>
            <form className="lead-form" onSubmit={handleSubmit}>
              <Input aria-label="Ваше имя" autoComplete="name" name="name" placeholder="Ваше имя" required />
              <Input aria-label="Ваш телефон" autoComplete="tel" name="phone" placeholder="+7 (___) ___-__-__" type="tel" required />
              <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <Button className="yellow-button" type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Отправляем…" : "Получить точную смету"} <ArrowRight />
              </Button>
            </form>
            {formStatus === "sent" && <p className="success-message" role="status"><Check /> Заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>}
            {formStatus === "error" && <p className="error-message" role="alert">{formError}</p>}
            <p className="privacy-note">Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.</p>
          </div>
        </div>
      </section>

      <section className="final-cta section-wrap">
        <div><div className="eyebrow dark"><span /> Есть сложный объект?</div><h2>Покажите его специалисту — предложим решение</h2></div>
        <Button asChild className="dark-button"><a href="tel:+70000000000"><Phone /> Позвонить специалисту</a></Button>
      </section>

      <footer className="footer"><div className="section-wrap footer-grid">
        <div><a className="brand footer-brand" href="#top"><span className="brand-mark"><Layers3 size={22} /></span><span>ТЕПЛОКОНТУР</span></a><p>Концепт лендинга для компании по утеплению пенополиуретаном.</p></div>
        <div className="footer-contact"><span>Телефон</span><a href="tel:+70000000000">+7 000 000-00-00</a></div>
        <div className="footer-contact"><span>Регион работы</span><strong>Ваш город и область</strong></div>
        <div className="footer-contact"><span>Режим работы</span><strong>Пн–Сб · 09:00–19:00</strong></div>
      </div><div className="section-wrap footer-bottom"><span>© 2026 Теплоконтур</span><span>Демонстрационный дизайн-концепт</span></div></footer>
    </main>
  );
}
