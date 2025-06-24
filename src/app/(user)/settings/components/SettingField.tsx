import { TextField } from '@/components/UI/UIComponents';
import { setting } from '@/constants/settings-constant';
import { i18n } from '@/utils/customUtils';
import { ChangeEvent, memo } from 'react';

interface SettingFieldProps {
  section: string;
  keyName: string;
  config: setting;
  value: string;
  onChange: (section: string, key: string, value: string) => void;
}

const SettingField = ({ section, keyName, config, value, onChange }: SettingFieldProps) => {
  const fieldType = config.type ?? (config.options ? 'select' : 'text');

  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-medium">{i18n.t(`settings.${config.label}`) || keyName}</label>

      {fieldType === 'radio' ? (
        <div className="flex gap-4">
          {(config.options || ['true', 'false']).map((opt: string) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name={`${section}-${keyName}`}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(section, keyName, opt)}
              />
              {i18n.t(`settings.options.${opt}`)}
            </label>
          ))}
        </div>
      ) : fieldType === 'select' ? (
        <select value={value} onChange={(e) => onChange(section, keyName, e.target.value)}>
          {config?.options?.map((opt: string) => (
            <option key={opt} value={opt}>
              {i18n.t(`settings.options.${opt}`)}
            </option>
          ))}
        </select>
      ) : (
        <TextField
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(section, keyName, e.target.value)
          }
          placeholder={i18n.t(`settings.${config.label}`)}
        />
      )}
    </div>
  );
};

export default memo(SettingField);
