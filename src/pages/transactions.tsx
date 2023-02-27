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
        <SearchBox className={styles.searchBox} />
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
            <div className={styles.modalRow}>
              <div className={styles.modalRowTitle}>Signature</div>
              <div className={styles.breakText}>{modalData.signature}</div>
            </div>
            <div className={cn(styles.modalRow, styles.modalCol)}>
              <div className={styles.modalCell}>
                <div className={styles.modalRowTitle}>From</div>
                <div className={styles.breakText}>{modalData.sender}</div>
              </div>
              <div className={styles.modalCell}>
                <div className={styles.modalRowTitle}>To</div>
                <div className={styles.breakText}>{modalData.recipient}</div>
              </div>
            </div>
            <div className={cn(styles.modalRow, styles.modalCol)}>
              <div className={styles.modalCell}>
                <div className={styles.modalRowTitle}>Block</div>
                <div className={styles.breakText}>
                  <span className={styles.numeric}>{modalData.block}</span>
                </div>
              </div>
              <div className={styles.modalCell}>
                <div className={styles.modalRowTitle}>Link</div>
                <div className={styles.breakText}>
                  <SolScanLink signature={modalData.signature} />
                </div>
              </div>
              <div className={styles.modalCell}>
                <div className={styles.modalRowTitle}>Amount</div>
                <div className={styles.breakText}>
                  <span className={styles.numeric}>{modalData.amount}</span> SOL
                </div>
              </div>
            </div>
            <div className={styles.modalRow}>
              <div className={styles.modalRowTitle}>Previous Block</div>
              <div className={styles.breakText}>{modalData.previousBlockHash}</div>
            </div>
            <div className={styles.modalRow}>
              <div className={styles.modalRowTitle}>Timestamp</div>
              <div className={styles.breakText}>
                {new Date(modalData.timestamp as number).toTimeString()}
              </div>
            </div>
          </div>
        ) : null}
        <Button onPress={modalState.close}>Close</Button>
      </Modal>
    </div>
  );
};

export default Transactions;
