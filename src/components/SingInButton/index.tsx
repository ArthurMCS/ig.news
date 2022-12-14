import React from 'react'
import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, useSession, signOut } from 'next-auth/react'

export default function SignInButton() {
 const { data: session } = useSession()

  return session ? (
    <button 
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
    >
        <FaGithub color="#04d361"/>
            {session.user.name}
        <FiX color="#737380" className={styles.closeIcon} />
    </button>

  ) : (
    <button 
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('github')}
    >   
        <FaGithub color="#eba417"/>
            Sign in with Github
    </button>
  );
}
