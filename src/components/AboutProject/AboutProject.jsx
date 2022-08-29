import './AboutProject.css';
function AboutProject() {
    return (
        <section className="aboutProject" id="about-project">
            <h2 className="main__section-title">О проекте</h2>
            <hr className='main__section-separator'/>
            <div className='about-project__two-columns'>
                <div className='about-project__column'>
                    <h3 className='about-project__column-header'>Дипломный проект включал 5 этапов</h3>
                    <p className='main__section-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='about-project__column'>
                    <h3 className='about-project__column-header'>На выполнение диплома ушло 5 недель</h3>
                    <p className='main__section-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='about-project__timeline'>
                <div className='about-project__timeline-part about-project__timeline-part_color_green'><p className='about-project__timeline-weeks'>1 неделя</p></div>
                <div className='about-project__timeline-part about-project__timeline-part_color_grey'><p className='about-project__timeline-weeks'>4 недели</p></div>
                <p className='about-project__timeline-caption'>Back-end</p>
                <p className='about-project__timeline-caption'>Front-end</p>
            </div>
        </section>
    )
}

export default AboutProject;