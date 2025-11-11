import styles from './SubbridgeSunsetAnnouncement.module.css'

export default function SubbridgeSunsetAnnouncement() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            SubBridge Service Has Been Discontinued
          </h1>

          <p className={styles.subtitle}>
            The SubBridge service has been permanently discontinued as part of
            the Phala Network parachain sunset.
          </p>

          <div className={styles.infoSection}>
            <p className={styles.infoTitle}>
              <strong>Important Information:</strong>
            </p>
            <ul className={styles.infoList}>
              <li>
                The Phala Network parachain has completed its sunset process
              </li>
              <li>
                All bridge operations between Phala and other chains have been
                disabled
              </li>
              <li>
                For more details about the parachain sunset, please refer to the{' '}
                <a
                  href="https://phala.subsquare.io/democracy/referenda/77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  governance referendum
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.bridgeSection}>
            <h2 className={styles.bridgeTitle}>New L2 Bridge Available</h2>
            <p className={styles.bridgeText}>
              For bridging assets on Phala's Layer 2 network, please use our new
              bridge service:
            </p>
            <a
              href="https://bridge.phala.network"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              Visit bridge.phala.network
            </a>
          </div>

          <div className={styles.footer}>
            <p>
              Thank you for using SubBridge. We appreciate your support
              throughout the journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
