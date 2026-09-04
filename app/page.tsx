"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowDownRight, ArrowRight, Check, Droplets, Flame, Gauge, Home,
  Layers3, Menu, MessageCircle, Phone, Ruler, ShieldCheck,
  Volume2, Wind, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  { icon: Wind, number: "01", title: "Заполняет полости без стыков", text: "Древесное волокно распределяется внутри подготовленной конструкции и заполняет пространство вокруг элементов каркаса." },
  { icon: Droplets, number: "02", title: "Помогает регулировать влажность", text: "Волокно способно принимать и отдавать влагу. Вместе с правильно подобранными мембранами это поддерживает комфортный микроклимат." },
  { icon: Volume2, number: "03", title: "Тепло- и звукоизоляция", text: "Плотный слой уменьшает теплопотери и помогает приглушить шум в стенах, перекрытиях и кровельных конструкциях." },
  { icon: Flame, number: "04", title: "Защитные свойства", text: "В составе 5% нелетучей огнебиозащиты. Натуральная основа дополнена антипиреном для защиты материала." },
];

const technologyPoints = [
  ["Равномерное заполнение", "Материал подаётся под давлением и распределяется по всей подготовленной полости."],
  ["Меньше потенциальных мостиков холода", "Нет стыков между плитами, через которые обычно возникают дополнительные теплопотери."],
  ["Контролируемая плотность", "Для стен рабочая плотность рассчитывается с учётом конструкции; ориентир — 45 кг/м³."],
  ["Проверка после монтажа", "Контролируем заполнение и герметичность узлов, швов и примыканий."],
];

const applications = [
  { icon: Home, title: "Каркасные стены", text: "Наружные стены нового дома и реконструкция существующих конструкций" },
  { icon: Layers3, title: "Полы и перекрытия", text: "Цокольные, межэтажные и чердачные перекрытия" },
  { icon: Home, title: "Кровля и мансарды", text: "Скатные крыши, закрытые полости и мансардные этажи" },
  { icon: ShieldCheck, title: "Фасадные конструкции", text: "Теплоизоляционный контур с ветрозащитой и вентиляционным зазором" },
  { icon: Volume2, title: "Внутренние перегородки", text: "Дополнительная звукоизоляция жилых и технических помещений" },
  { icon: Ruler, title: "Весь контур дома", text: "Комплексное утепление стен, пола, перекрытий и кровли" },
];

const systemItems = [
  { icon: Gauge, title: "Теплотехнический расчёт", text: "Определяем необходимую толщину утепления для конкретной конструкции и условий эксплуатации." },
  { icon: Layers3, title: "Активная пароизоляция", text: "Подбираем систему мембран и формируем правильный слой защиты со стороны помещения." },
  { icon: ShieldCheck, title: "Герметизация узлов", text: "Проклеиваем стыки, швы и примыкания, чтобы создать непрерывный герметичный контур." },
  { icon: Wind, title: "Ветрозащита и вентзазор", text: "Защищаем конструкцию снаружи и предусматриваем отвод возможной влаги." },
];

const steps = [
  ["01", "Заявка и исходные данные", "Уточняем город, конструкцию, площадь и текущее состояние объекта."],
  ["02", "Теплотехнический расчёт", "Подбираем толщину, плотность и состав системы под ваш дом."],
  ["03", "Подготовка конструкции", "Монтируем обрешётку, мембраны и готовим закрытые полости к заполнению."],
  ["04", "Герметизация", "Проклеиваем стыки, швы и примыкания специализированными материалами."],
  ["05", "Задувка утеплителя", "Равномерно заполняем полости древесным волокном до проектной плотности."],
  ["06", "Контроль качества", "Проверяем заполнение и герметичность конструкции, при необходимости проводим аэродверь-тест."],
];

const faqs = [
  { question: "Чем древесный утеплитель отличается от плитной минваты?", answer: "Главное отличие — способ монтажа. Задувной материал заполняет подготовленную полость без стыков между плитами. Итог зависит не только от самого утеплителя, но и от расчёта плотности, качества мембран и герметизации конструкции." },
  { question: "Подходит ли древесный утеплитель для уже построенного дома?", answer: "Да, технологию применяют и при новом строительстве, и при реконструкции. Возможность монтажа и доступ к полостям специалист оценивает по фотографиям или во время осмотра объекта." },
  { question: "Что нужно прислать для расчёта?", answer: "Город или район, что именно нужно утеплить, площадь или размеры, известную толщину конструкции и несколько фотографий. После заявки специалист уточнит детали и подготовит расчёт материала, работ и сроков." },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");

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
          name: data.get("name"), phone: data.get("phone"), city: data.get("city"),
          workType: data.get("workType"), area: data.get("area"), thickness: data.get("thickness"),
          message: data.get("message"), website: data.get("website"),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) throw new Error(result?.error || "Не удалось отправить заявку");
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
        <a className="brand" href="#top" aria-label="Теплодом38 — на главную">
          <span className="brand-mark"><Layers3 size={22} strokeWidth={2.4} /></span><span>Теплодом38</span>
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href="#material">Материал</a><a href="#applications">Где утепляем</a><a href="#process">Как работаем</a><a href="#estimate">Расчёт</a>
        </nav>
        <div className="header-actions">
          <a className="phone-link" href="tel:+79646513838"><Phone size={17} /> +7 964 651-38-38</a>
          <Button asChild className="yellow-button header-cta">
            <a href="#estimate">Рассчитать стоимость</a>
          </Button>
          <button className="menu-button" type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="mobile-nav" aria-label="Мобильная навигация">
          <a href="#material" onClick={() => setMenuOpen(false)}>Материал</a><a href="#applications" onClick={() => setMenuOpen(false)}>Где утепляем</a><a href="#process" onClick={() => setMenuOpen(false)}>Как работаем</a><a href="#estimate" onClick={() => setMenuOpen(false)}>Рассчитать стоимость</a>
        </nav>}
      </header>

      <section className="hero" id="top">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-content section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Натуральный задувной утеплитель</div>
            <h1>Древесное тепло <span>без стыков</span></h1>
            <p className="hero-lead">Утепляем дома древесным волокном: рассчитываем толщину, готовим герметичный контур и равномерно заполняем стены, полы, перекрытия и кровлю.</p>
          </div>
        </div>
      </section>

      <section className="intro section-wrap" id="material">
        <div className="section-heading"><div className="eyebrow dark"><span /> Что такое древесный утеплитель</div><h2>Теплоизоляция на основе древесного волокна</h2></div>
        <div className="material-summary"><p>Древесный утеплитель — задувной материал для тепло- и звукоизоляции жилых домов и других зданий. Его используют в конструкциях, где важно заполнить весь объём утепления без стыков между плитами.</p><div className="composition"><div><strong>95%</strong><span>натуральное древесное волокно</span></div><div><strong>5%</strong><span>нелетучая огнебиозащита</span></div></div></div>
      </section>

      <section className="benefit-grid section-wrap" aria-label="Преимущества древесного утеплителя">
        {benefits.map(({ icon: Icon, number, title, text }) => <article className="benefit-card" key={number}><div className="benefit-top"><Icon /><span>{number}</span></div><h3>{title}</h3><p>{text}</p></article>)}
      </section>

      <section className="technology-section" id="technology"><div className="section-wrap technology-wrap">
        <div className="technology-copy"><div className="eyebrow"><span /> Преимущество задувки</div><h2>Непрерывный теплоизоляционный контур</h2></div>
        <div className="technology-text"><p>Плитный утеплитель приходится подрезать и стыковать. Древесное волокно подаётся внутрь конструкции и заполняет сложные участки вокруг стоек, балок и коммуникаций.</p><div className="manufacturer-note"><ShieldCheck /><span>Производитель заявляет отсутствие усадки не менее 50 лет при соблюдении технологии монтажа.</span></div></div>
        <div className="technology-visual"><Image src="/krasinsul-wall.jpg" alt="Слои каркасной стены с древесным утеплителем" fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
        <div className="technology-list">{technologyPoints.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div></section>

      <section className="applications section-wrap" id="applications">
        <div className="section-heading split-heading"><div><div className="eyebrow dark"><span /> Где утепляем</div><h2>Один материал для всего контура дома</h2></div><p>Работаем при строительстве нового дома и при реконструкции. Перед расчётом проверяем, как устроена конструкция и можно ли обеспечить нужную плотность заполнения.</p></div>
        <div className="application-grid">{applications.map(({ icon: Icon, title, text }, index) => <article className="application-card" key={title}><div className="application-number">0{index + 1}</div><Icon /><h3>{title}</h3><p>{text}</p><ArrowDownRight className="application-arrow" /></article>)}</div>
      </section>

      <section className="system-section"><div className="section-wrap">
        <div className="section-heading system-heading"><div><div className="eyebrow dark"><span /> Комплексная система</div><h2>Не просто «задуваем вату»</h2></div><p>Теплоизоляция работает только как часть правильно собранной конструкции. Поэтому расчёт, мембраны и герметизация входят в общую технологию работ.</p></div>
        <div className="system-grid">{systemItems.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>

      <section className="process section-wrap" id="process">
        <div className="process-aside"><div className="eyebrow dark"><span /> Как проходит утепление</div><h2>От расчёта до проверки</h2><p>До начала монтажа вы понимаете состав работ, необходимую толщину, объём материала и сроки.</p><div className="process-image"><Image src="/krasinsul-installation.jpg" alt="Задувка древесного утеплителя и контроль герметичности дома" fill sizes="(max-width: 900px) 100vw, 35vw" /></div></div>
        <div className="steps">{steps.map(([number, title, text]) => <article className="step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div><Check /></article>)}</div>
      </section>

      <section className="choice-section"><div className="section-wrap choice-wrap"><div><div className="eyebrow"><span /> Сравниваете материалы?</div><h2>Считайте всю конструкцию, а не цену за кубометр</h2></div><p>При выборе между эковатой, минеральной, каменной, базальтовой и древесной ватой важны толщина, рабочая плотность, мостики холода, мембраны, герметичность и стоимость монтажа. Мы рассчитаем вариант именно для вашего дома и покажем, из чего складывается смета.</p></div></section>

      <section className="estimate-section" id="estimate"><div className="section-wrap estimate-wrap">
        <div className="estimate-copy"><div className="eyebrow"><span /> Расчёт утепления</div><h2>Расскажите, что нужно утеплить</h2><p>Оставьте основные данные. Специалист уточнит конструкцию, попросит фотографии и рассчитает толщину утеплителя, объём материала, стоимость работ и сроки.</p><div className="estimate-checklist"><div><Check /> город или район</div><div><Check /> стены, пол, кровля или весь дом</div><div><Check /> площадь и известная толщина конструкции</div><div><Check /> фотографии после первого контакта</div></div><div className="estimate-phones"><span>Можно сразу позвонить</span><a href="tel:+79646513838">+7 964 651-38-38</a></div></div>
        <div className="estimate-card">
          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="field"><label htmlFor="name">Ваше имя *</label><Input id="name" name="name" autoComplete="name" placeholder="Как к вам обращаться" required /></div>
            <div className="field">
              <label htmlFor="phone">Телефон *</label>
              <Input id="phone" name="phone" autoComplete="tel" placeholder="+7 (___) ___-__-__" type="tel" required pattern="(\+7|8)[0-9\s\-\(\)]{10,}" title="Введите корректный номер телефона"/>
            </div>
            <div className="field"><label htmlFor="city">Город или район</label><Input id="city" name="city" autoComplete="address-level2" placeholder="Например, Иркутск" /></div>
            <div className="field">
              <label htmlFor="workType">Что нужно утеплить</label>
                <select id="workType" name="workType" defaultValue="">
                  <option value="" disabled>Выберите конструкцию</option>
                  <option>Стены</option>
                  <option>Пол или перекрытия</option>
                  <option>Кровля или мансарда</option>
                  <option>Фасад</option>
                  <option>Весь дом</option>
                  <option>Другое</option>
                </select>
            </div>
            <div className="field">
              <label htmlFor="area">Площадь, м²</label>
              <Input id="area" name="area" inputMode="decimal" min="1" max="10000" placeholder="Если известна" type="number" />
            </div>
            <div className="field">
              <label htmlFor="thickness">Толщина конструкции, мм</label>
              <Input id="thickness" name="thickness" inputMode="numeric" min="1" max="1000" placeholder="Если известна" type="number" />
            </div>
            <div className="field field-wide">
              <label htmlFor="message">Комментарий</label>
              <textarea id="message" name="message" rows={4} placeholder="Новый дом или реконструкция, особенности конструкции, удобное время для звонка" />
            </div>
            <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <Button className="yellow-button field-wide submit-button" type="submit" disabled={formStatus === "sending"}>{formStatus === "sending" ? "Отправляем…" : "Отправить на расчёт"} <ArrowRight /></Button>
          </form>
          {formStatus === "sent" && <p className="success-message" role="status"><Check /> Заявка отправлена. Специалист свяжется с вами в ближайшее время.</p>}
          {formStatus === "error" && <p className="error-message" role="alert">{formError}</p>}
          <p className="privacy-note">Нажимая кнопку, вы соглашаетесь с <Link href="/privacy">политикой обработки персональных данных</Link>.</p>
        </div>
      </div></section>

      <section className="faq section-wrap"><div className="faq-heading"><div className="eyebrow dark"><span /> Коротко о главном</div><h2>Частые вопросы</h2></div><div className="faq-list">{faqs.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></section>

      <section className="final-cta section-wrap">
        <div><div className="eyebrow dark">
            <span /> Есть фотографии объекта?</div><h2>Покажите конструкцию специалисту</h2><p>По фотографиям мы быстрее поймём задачу и зададим точные вопросы для расчёта.</p></div><Button asChild className="dark-button"><a href="#estimate"><MessageCircle /> Оставить заявку</a></Button>
      </section>

      <footer className="footer">
        <div className="section-wrap footer-grid">
          <div>
            <a className="brand footer-brand" href="#top">
              <span className="brand-mark"><Layers3 size={22} /></span>
              <span>Теплодом38</span>
            </a>
            <p>Комплексное утепление домов натуральным задувным древесным волокном.</p>
          </div>
          <div className="footer-contact">
            <span>Телефон</span>
            <a href="tel:+79646513838">+7 964 651-38-38</a>
          </div>
          <div className="footer-contact">
            <span>Адрес</span>
            <strong>г. Иркутск, ул. Полярная, 95А</strong>
          </div>
        </div>
        
        <div className="section-wrap footer-bottom">
          <span>© 2026 Теплодом38</span>
          <Link href="/privacy" className="privacy-link">Политика конфиденциальности</Link>
        </div>
      </footer>

    </main>
  );
}
