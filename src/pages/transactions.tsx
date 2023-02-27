import { useCallback, useState } from 'react';
import { useOverlayTriggerState } from 'react-stately';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  Configure,
} from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import cn from 'classnames';
import { Button, Modal, SolScanLink } from '@/components';
import { TransactionWithTimestamp } from '@/types/transaction';
import styles from '@/styles/Transactions.module.scss';

const Transactions = () => {
  const searchClient = algoliasearch('X7D1A1A5W2', '944bdfd54dafcf8cb075f290be12b855');
  const { publicKey } = useWallet();
  const [modalData, setModalData] = useState<TransactionWithTimestamp | null>(null);
  const modalState = useOverlayTriggerState({});

  const Hit = useCallback(
    (props: { hit: any }) => {
      const { hit } = props;
      return (
        <article className={styles.hit}>
          <div className={styles.cellLeft}>
            <button
              type="button"
              aria-label="Show Transaction Details"
              onClick={() => {
                setModalData(hit);
                modalState.open();
              }}
            >
              <InformationCircleIcon className={styles.informationIcon} />
            </button>
          </div>
          <div className={styles.cellCenter}>
            <div className={styles.cellTruncate}>
              <Highlight
                className={styles.highlight}
                title={hit.signature}
                hit={hit}
                attribute="signature"
              />
            </div>
            <div className={styles.cellTruncate}>
              <Highlight
                className={styles.highlight}
                title={hit.recipient}
                hit={hit}
                attribute="recipient"
              />
            </div>
          </div>
          <div className={styles.cellRight}>
            <Highlight
              className={cn(styles.highlight, styles.solAmount)}
              title={hit.amount}
              hit={hit}
              attribute="amount"
            />{' '}
            SOL
          </div>
        </article>
      );
    },
    [modalState],
  );

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="sol">
        <Configure filters={`sender:${publicKey?.toBase58()}`} />
        <div className={styles.searchBoxContainer}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="search-box" className={styles.searchBoxLabel}>
            Search Transfer History
          </label>
          <SearchBox
            id="search-box"
            className={styles.searchBox}
            placeholder="Wallet address, Signature..."
          />
        </div>
        <div className={styles.hitWrapper}>
          <div className={cn(styles.hit, styles.tableHead)}>
            <div className={styles.cellLeft} />
            <div className={styles.cellCenter}>
              <div className={styles.cellTruncate}>Signature</div>
              <div className={styles.cellTruncate}>Recipient</div>
            </div>
            <div className={styles.cellRight}>Amount</div>
          </div>
          <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
      <Modal isDismissable state={modalState}>
        {modalData ? (
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Transaction Details</h3>
            <section className={styles.modalRow}>
              <h4 className={styles.modalRowTitle}>Signature</h4>
              <p className={styles.breakText}>{modalData.signature}</p>
            </section>
            <section className={cn(styles.modalRow, styles.modalCol)}>
              <div className={styles.modalCell}>
                <h4 className={styles.modalRowTitle}>From</h4>
                <p className={styles.breakText}>{modalData.sender}</p>
              </div>
              <div className={styles.modalCell}>
                <h4 className={styles.modalRowTitle}>To</h4>
                <p className={styles.breakText}>{modalData.recipient}</p>
              </div>
            </section>
            <section className={cn(styles.modalRow, styles.modalCol)}>
              <div className={styles.modalCell}>
                <h4 className={styles.modalRowTitle}>Block</h4>
                <p className={styles.breakText}>
                  <span className={styles.numeric}>{modalData.block}</span>
                </p>
              </div>
              <div className={styles.modalCell}>
                <h4 className={styles.modalRowTitle}>Link</h4>
                <p className={styles.breakText}>
                  <SolScanLink signature={modalData.signature} />
                </p>
              </div>
              <div className={styles.modalCell}>
                <h4 className={styles.modalRowTitle}>Amount</h4>
                <p className={styles.breakText}>
                  <span className={styles.numeric}>{modalData.amount}</span> SOL
                </p>
              </div>
            </section>
            <section className={styles.modalRow}>
              <h4 className={styles.modalRowTitle}>Previous Block</h4>
              <p className={styles.breakText}>{modalData.previousBlockHash}</p>
            </section>
            <section className={styles.modalRow}>
              <h4 className={styles.modalRowTitle}>Timestamp</h4>
              <p className={styles.breakText}>
                {new Date(modalData.timestamp as number).toTimeString()}
              </p>
            </section>
          </div>
        ) : null}
        <Button onPress={modalState.close}>Close</Button>
      </Modal>
    </div>
  );
};

export default Transactions;
