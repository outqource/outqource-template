import cx from 'classnames'
import { NavLink } from 'react-router-dom'
import { GA_EVENT_NAMES } from 'constants/ga'
import styles from './GNB.module.scss'

import i18n from 'utils/locale'
import store, { LANGUAGE_KEY } from 'utils/store'
import { useAppDispatch, useAppSelector, useEffect, useGA, useI18n, useState } from 'hooks'
import { getTheme, toggleTheme } from 'states/system'

const storedLang = store.get(LANGUAGE_KEY) || 'EN'

const navData = ['kakao', 'google', 'buttons', 'corona', 'todo', 'weather']

const GNB = () => {
  const t = useI18n()
  const { gaEvent } = useGA()
  const [lang, setLang] = useState(storedLang)
  const dispatch = useAppDispatch()
  const theme = useAppSelector(getTheme)

  const handleLangClick = () => {
    setLang(lang === 'EN' ? 'KO' : 'EN')
    i18n.changeLanguage(lang.toLowerCase())
    gaEvent(GA_EVENT_NAMES.LANGUAGE_CHANGED, { lang })
  }

  const handleThemeClick = () => {
    dispatch(toggleTheme())
    gaEvent(GA_EVENT_NAMES.THEME_CHANGED, { theme: theme === 'light' ? 'dark' : 'light' })
  }

  useEffect(() => {
    store.set(LANGUAGE_KEY, lang)
  }, [lang])

  return (
    <nav className={styles.gnb}>
      <ul>
        {navData.map((item) => {
          return (
            <li key={`gnb-item-${item}`}>
              <NavLink to={item} className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
                <p>{`${t(`front:gnb.${item}`)}`}</p>
              </NavLink>
            </li>
          )
        })}
      </ul>
      <div className={styles.rightWing}>
        <button type='button' onClick={handleThemeClick} className={styles.theme}>
          {theme}
        </button>
        <button type='button' onClick={handleLangClick} className={styles.language}>
          {lang}
        </button>
      </div>
    </nav>
  )
}

export default GNB
