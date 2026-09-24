"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Layers3, Menu, MessageCircle, Phone, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const materialFeatures = [
  {
    image: "/images/material/icon-fill.png",
    title: "Заполняет полости без стыков",
    text: "Древесное волокно распределяется внутри подготовленной конструкции и заполняет пространство вокруг элементов каркаса.",
  },
  {
    image: "/images/material/icon-moisture.png",
    title: "Помогает регулировать влажность",
    text: "Волокно способно принимать и отдавать влагу. Вместе с правильно подобранными мембранами это поддерживает комфортный микроклимат.",
  },
  {
    image: "/images/material/icon-sound.png",
    title: "Тепло- и звукоизоляция",
    text: "Плотный слой уменьшает теплопотери и помогает приглушить шум.",
  },
  {
    image: "/images/material/icon-fire.png",
    title: "Защитные свойства",
    text: "В составе 5% нелетучей огнебиозащиты.",
  },
  {
    image: "/images/material/icon-protection.png",
    title: "Защита от грызунов, насекомых и бактерий.",
    text: "Защитные добавки предотвращают развитие биологических поражений.",
  },
];

const comparisonRows = [
  {
    title: "Теплопроводность λ, Вт/(м·К)",
    wood: "0,036–0,046",
    mineral: "0,035–0,045",
    ecowool: "0,037–0,042",
    xps: "0,025–0,035",
  },
  {
    title: "Удельная теплоёмкость, Дж/(кг·К)",
    wood: "2100",
    mineral: "840",
    ecowool: "~1800–2000",
    xps: "~1400–1500",
  },
  {
    title: "μ (сопротивление пару)",
    wood: "2–5",
    mineral: "~1",
    ecowool: "1–2",
    xps: ">100",
  },
  {
    title: "Сорбционная влага",
    wood: "17,9 кг/м²",
    mineral: "0,2 кг/м²",
    ecowool: "~12–16%",
    xps: "~0",
  },
];

const applications = [
  {
    image: "/images/applications/frame-walls.jpg",
    title: "Каркасные стены",
    text: "Наружные стены нового дома и реконструкция существующих конструкций",
  },
  {
    image: "/images/applications/floors.jpg",
    title: "Полы и перекрытия",
    text: "Цокольные, межэтажные и чердачные перекрытия",
  },
  {
    image: "/images/applications/roof.jpg",
    title: "Кровля и мансарды",
    text: "Скатные крыши, закрытые полости и мансардные этажи",
  },
  {
    image: "/images/applications/facade.jpg",
    title: "Фасадные конструкции",
    text: "Теплоизоляционный контур с ветрозащитой и вентиляционным зазором",
  },
  {
    image: "/images/applications/partitions.jpg",
    title: "Межкомнатные перегородки",
    text: "Дополнительная звукоизоляция жилых и технических помещений",
  },
];

const services = [
  {
    image: "/images/services/production.jpg",
    title: "Погонажные изделия для каркасного домостроения и отделки",
  },
  {
    image: "/images/services/house.jpg",
    title: "Комплексное домостроение под ключ.",
  },
];

const systemItems = [
  {
    image: "/images/system/icon-calculation.png",
    title: "Теплотехнический расчёт",
    text: "Определяем необходимую толщину утепления для конкретной конструкции и условий эксплуатации.",
  },
  {
    image: "/images/system/icon-layer.png",
    title: "Активная пароизоляция",
    text: "Подбираем систему мембран и формируем правильный слой защиты со стороны помещения.",
  },
  {
    image: "/images/system/icon-shield.png",
    title: "Герметизация узлов",
    text: "Проклеиваем стыки, швы и примыкания, чтобы создать непрерывный герметичный контур.",
  },
  {
    image: "/images/system/icon-wind.png",
    title: "Ветрозащита и вентзазор",
    text: "Защищаем конструкцию снаружи и предусматриваем отвод возможной влаги.",
  },
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
          phone: data.get("phone"),
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
        <div className="hero-container">
          <div className="hero-content">

            <p className="hero-label">Энергоэффективное натуральное утепление</p>
            <h1>ДРЕВЕСНЫМ ВОЛОКНОМ — <span>KRASINSUL</span></h1>
            <p className="hero-location">в Иркутской области под ключ.</p>

            <div className="hero-info">
              <div className="hero-info-item">
                <div className="hero-info-icon">
                  <Image src="/images/hero/hero-house.png" alt="" width={42} height={42}/>
                </div>
                <p><strong>Древесное волокно KRASINSUL —</strong>это не просто утеплитель, а элемент системы управления влагой в доме.</p>
              </div>

              <div className="hero-info-item">
                <div className="hero-info-icon">
                  <Image src="/images/hero/hero-thermal.png" alt="" width={42} height={42}/>
                </div>
                <p><strong>Тепловая инерция.</strong>Снижение нагрузки на систему кондиционирования при отоплении и охлаждении. Тем самым экономит электроэнергию.</p>
              </div>

              <div className="hero-info-item">
                <div className="hero-info-icon">
                  <Image src="/images/hero/hero-eco.png" alt="" width={42} height={42}/>
                </div>
                <p><strong>Экологичный антипирин —</strong>Без формальдегида, стирола, фталатов.</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <Image src="/images/hero/house-cut.png" alt="Древесное утепление KRASINSUL" fill priority sizes="(max-width:900px) 70vw, 30vw"
            />
          </div>
        </div>

        <div className="hero-features">
          <div className="hero-feature">
            <strong>ЭКОЛОГИЧНОСТЬ</strong>
            <span>Низкий уровень эмиссии делают материал безопасным</span>
          </div>

          <div className="hero-feature">
            <strong>УСТОЙЧИВОСТЬ К УСАДКЕ</strong>
            <span>Отсутствие проседания утеплителя в конструкции</span>
          </div>

          <div className="hero-feature">
            <strong>ДОЛГОВЕЧНОСТЬ</strong>
            <span>Срок службы более 50 лет</span>
          </div>

          <div className="hero-feature">
            <strong>ЭКОНОМИЯ ДО 50%</strong>
            <span>Уменьшение затрат на отопление за счет сохранения тепла</span>
          </div>
        </div>
      </section>


      <section className="lead-banner" aria-labelledby="lead-banner-title">
        <div className="lead-banner__inner">
          <h2 id="lead-banner-title">Узнайте стоимость утепления с работой и материалами</h2>

          <p>за 3 минуты по телефону, заполните форму:</p>

          <form className="lead-banner__form" onSubmit={handleSubmit}>
            <Input type="tel" name="phone" placeholder="Укажите номер телефона" required/>

            <Button type="submit" className="lead-banner__button" disabled={formStatus === "sending"}>
              {formStatus === "sending"
                ? "Отправка..."
                : "Узнать стоимость"}
            </Button>
          </form>

          {formStatus === "sent" && (
            <p className="lead-banner__success">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
          )}

          {formStatus === "error" && (
            <p className="lead-banner__error">{formError}</p>
          )}

          <small>Нажимая на кнопку &quot;Узнать стоимость&quot;, я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с&nbsp;
            <Link href="/privacy">Политикой конфиденциальности</Link>
          </small>
        </div>
      </section>


      <section className="material" id="material">
        <div className="section-wrap">
          <div className="material-header">
            <h2>
              Древесный задувной утеплитель - <span>Krasinsul</span>
            </h2>
            <p>95% древесное волокно, 5% - нелетучая огнебиозащита.</p>
          </div>

          <div className="material-layout">
            <div className="material-features">
              {materialFeatures.map((item) => (
                <article className="material-feature" key={item.title}>
                  <Image
                    src={item.image}
                    alt=""
                    width={34}
                    height={34}
                  />
                  <div className="material-feature-text">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="material-side">
              <div className="material-photo">
                <Image
                  src="/images/material/krasinsul-blowing.png"
                  alt="Задувной древесный утеплитель"
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>

              <div className="material-vapor">
                <Image
                  src="/images/material/icon-vapor.png"
                  alt=""
                  width={60}
                  height={60}
                />
                <div>
                  <h3>Паропроницаемость.</h3>
                  <p>
                    Повышает надёжность узлов, снижает вероятность образования
                    конденсата внутри стены и поддерживает комфортный микроклимат.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="comparison">
        <div className="section-wrap">
          <h2 className="comparison-title">Древесное волокно это — утеплитель который имеет лучшую
            <br />
            <span>тепловую энергию.</span>
          </h2>

          <div className="comparison-table">
            <div className="comparison-head">
              <div></div>

              <div className="comparison-material active">
                <div className="comparison-material-image">
                  <Image src="/images/comparison/wood-fiber.jpg" alt="Древесное волокно" fill/>
                </div>
                <span>Древесное волокно</span>
              </div>

              <div className="comparison-material">
                <div className="comparison-material-image">
                  <Image src="/images/comparison/mineral-wool.jpg" alt="Минеральная вата" fill/>
                </div>
                <span>Минеральная вата</span>
              </div>

              <div className="comparison-material">
                <div className="comparison-material-image">
                  <Image src="/images/comparison/ecowool.jpg" alt="Эковата" fill/>
                </div>
                <span>Эковата</span>
              </div>

              <div className="comparison-material">
                <div className="comparison-material-image">
                  <Image src="/images/comparison/xps.jpg" alt="XPS EPS" fill/>
                </div>
                <span>XPS/EPS</span>
              </div>
            </div>

            {comparisonRows.map((row) => (
              <div className="comparison-row" key={row.title}>
                <div>{row.title}</div>
                <div className="active">{row.wood}</div>
                <div>{row.mineral}</div>
                <div>{row.ecowool}</div>
                <div>{row.xps}</div>
              </div>
            ))}
          </div>

          <div className="comparison-info">
            <div className="comparison-photo">
              <Image src="/images/comparison/photo_wood_fiber.png" alt="Плиты древесного волокна" fill/>
            </div>

            <div className="comparison-benefits">
              <h3>ПОЧЕМУ ДРЕВЕСНОЕ ВОЛОКНО?</h3>

              <div className="comparison-benefit">
                <Image src="/images/comparison/icon_thermo.png" alt="" width={60} height={60}/>
                <p>Высокая удельная теплоёмкость — 2100 Дж/(кг·К)</p>
              </div>

              <div className="comparison-benefit">
                <Image src="/images/comparison/icon_house.png" alt="" width={60} height={60}/>

                <p>Высокая тепловая инерция ограждающей конструкции</p>
              </div>

              <div className="comparison-benefit">
                <Image src="/images/comparison/icon_air.png" alt="" width={60} height={60}/>
                <p>Паропроницаемость и гигроскопичность</p>
              </div>

              <div className="comparison-benefit">
                <Image src="/images/comparison/icon_leaf.png" alt="" width={60} height={60}/>
                <p>Возобновляемое древесное сырьё и связывание углерода</p>
              </div>
            </div>

            <div className="comparison-description">
              <div className="comparison-house-icon">
                <Image src="/images/comparison/icon_energy_house.png" alt="" width={70} height={70}/>
              </div>

              <h3>Один из наиболее интересных материалов для энергоэффективного дома</h3>

              <div className="comparison-line" />

              <div className="comparison-description-text">
                <div className="comparison-light-icon">
                  <Image src="/images/comparison/icon_lightbulb.png" alt="" width={70} height={70}/>
                </div>
                <p>
                  Тепловая инерция помогает ограждающей конструкции сглаживать
                  перепады температуры. Высокая удельная теплоёмкость древесного
                  волокна позволяет материалу аккумулировать больше тепловой энергии.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="applications" id="applications">
        <div className="section-wrap">
          <h2 className="applications-title">
            ОДИН МАТЕРИАЛ ДЛЯ ВСЕГО КОНТУРА ДОМА
          </h2>

          <div className="applications-grid">
            {applications.slice(0, 4).map((item) => (
              <article className="applications-card" key={item.title}>
                <div className="applications-card-image">
                  <Image src={item.image} alt={item.title} fill sizes="260px"/>
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="applications-bottom">
            <article className="applications-card applications-card--left">
              <div className="applications-card-image">
                <Image src={applications[4].image} alt={applications[4].title} fill sizes="260px"/>
              </div>

              <h3>{applications[4].title}</h3>
              <p>{applications[4].text}</p>
            </article>

            <div className="applications-visual">
              <h3>Утепляем весь контур дома</h3>

              <div className="applications-house">
                <Image src="/images/applications/house-contour.png" alt="Утепляем весь контур дома" fill sizes="650px"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="section-wrap">

          <div className="services-header">
            <h2>Нужно не только утепление?</h2>
            <p>
              Наша компания занимается разными видами услуг:
              от розничной торговли до комплексного строительства домов под ключ.
            </p>
          </div>


          <div className="services-background">
            <Image src="/images/services/background-house.png" alt="" fill sizes="100%"/>
          </div>

          <div className="services-grid">
            {services.map((item) => (
              <article className="services-card" key={item.title}>
                <div className="services-card-image">
                  <Image src={item.image} alt={item.title} fill sizes="260px"/>
                </div>

                <h3>{item.title}</h3>

                <a href="#">Открыть страницу</a>
              </article>
            ))}

          </div>

        </div>
      </section>

      <section className="lead-banner" aria-labelledby="lead-banner-title">
        <div className="lead-banner__inner">
          <h2 id="lead-banner-title">Закажите комплексный расчет стоимости</h2>

          <p>Проведем один замер и пришлем несколько предложений</p>

          <form className="lead-banner__form" onSubmit={handleSubmit}>
            <Input type="tel" name="phone" placeholder="Укажите номер телефона" required/>

            <Button type="submit" className="lead-banner__button" disabled={formStatus === "sending"}>
              {formStatus === "sending"
                ? "Отправка..."
                : "Узнать стоимость"}
            </Button>
          </form>

          {formStatus === "sent" && (
            <p className="lead-banner__success">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
          )}

          {formStatus === "error" && (
            <p className="lead-banner__error">{formError}</p>
          )}

          <small>Нажимая на кнопку &quot;Узнать стоимость&quot;, я соглашаюсь на обработку моих персональных данных и ознакомлен(а) с&nbsp;
            <Link href="/privacy">Политикой конфиденциальности</Link>
          </small>
        </div>
      </section>


      <section className="system">
        <div className="section-wrap">
          <div className="system-header">
            <div className="system-title">
              <span>КОМПЛЕКСНАЯ СИСТЕМА</span>
              <h2>НЕ ПРОСТО<br />«ЗАДУВАЕМ ВАТУ»</h2>
            </div>

            <p className="system-description">
              Теплоизоляция работает только как часть правильно
              собранной конструкции. Поэтому расчёт, мембраны и
              герметизация входят в общую технологию работ.
            </p>
          </div>


          <div className="system-items">
            {systemItems.map((item) => (
              <article className="system-item" key={item.title}>
                <div className="system-icon">
                  <Image src={item.image} alt={item.title} fill sizes="40px"/>
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
