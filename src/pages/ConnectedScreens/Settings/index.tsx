import { Drawer } from 'components/Antd';
import Button from 'components/Button';
import useAptosWallet from 'hooks/useAptosWallet';
import { useCallback, useMemo, useState } from 'react';
import { CaretRightIcon, CloseIcon } from 'resources/icons';
import styles from './Settings.module.scss';
import ChangePassword from './ChangePassword';
import WalletDetail from './WalletDetail';
import usePage from 'hooks/usePage';

const Settings: React.FC = () => {
  const { disconnect } = useAptosWallet();
  const [screen, setScreen] = useState('');
  const [, setPage] = usePage();

  const settingMenu = useMemo(() => {
    return [
      {
        label: 'Manage Wallet',
        helpText: 'Rename, Private Key',
        onClick: () => setScreen('manageWallet')
      },
      {
        label: 'Change Password',
        helpText: 'Update your master password',
        onClick: () => setScreen('changePassword')
      },
      {
        label: 'Auto-Lock Timer',
        helpText: 'Change your auto-lock time duration',
        onClick: () => setScreen('lockTimer')
      }
    ];
  }, []);

  const onBackToSetting = () => setScreen('');

  const renderContent = useMemo(() => {
    switch (screen) {
      case 'manageWallet':
        return <WalletDetail onSuccess={onBackToSetting} />;
      case 'changePassword':
        return <ChangePassword onSuccess={onBackToSetting} />;
      case 'lockTimer':
      default:
        return null;
    }
  }, [screen]);

  const onLogout = useCallback(() => {
    setPage('login');
    disconnect();
  }, [disconnect, setPage]);

  return (
    <div className="flex flex-col overflow-y-scroll no-scrollbar pt-6">
      <Drawer
        title={null}
        placement="bottom"
        className={styles.drawer}
        closable={false}
        visible={!!screen}
        getContainer={false}
        style={{ position: 'absolute' }}>
        <div className="absolute inset-0 bg-image z-10 py-16 px-6">
          <div onClick={onBackToSetting} className="absolute right-6 top-9 cursor-pointer">
            <CloseIcon />
          </div>
          {renderContent}
        </div>
      </Drawer>
      {/* {!!screen && (
        <div className="absolute inset-0 bg-secondary z-10 py-16 px-8 border-4 border-grey-900 rounded-[11px]">
          <div onClick={onBackToSetting} className="absolute right-12 top-9 cursor-pointer">
            <CloseIcon />
          </div>
          {renderContent}
        </div>
      )} */}
      <div className="flex flex-col gap-28">
        <div className="flex flex-col gap-2">
          {settingMenu.map(({ label, helpText, onClick }) => {
            return (
              <div
                key={label}
                onClick={onClick}
                className="flex bg-grey-100 py-2 px-8 rounded-xl justify-between items-center cursor-pointer">
                <div className="flex flex-col">
                  <h5 className="font-bold text-grey-900 text-lg">{label}</h5>
                  <h6 className="text-grey-700 text-[14px]">{helpText}</h6>
                </div>
                <CaretRightIcon />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <Button className="font-bold">Lock Wallet</Button>
          <Button className="font-bold" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
