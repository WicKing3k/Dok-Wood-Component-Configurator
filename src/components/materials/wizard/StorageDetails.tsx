import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function StorageDetails() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="einheit" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.einheit')} *
        </label>
        <input
          type="text"
          id="einheit"
          {...register('einheit')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.einheit && (
          <p className="mt-1 text-sm text-red-600">
            {errors.einheit.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="richtpreisFertigVerbaut" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.richtpreisFertigVerbaut')} *
        </label>
        <input
          type="number"
          id="richtpreisFertigVerbaut"
          min="0"
          step="0.01"
          {...register('richtpreisFertigVerbaut', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.richtpreisFertigVerbaut && (
          <p className="mt-1 text-sm text-red-600">
            {errors.richtpreisFertigVerbaut.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="schnittstelleKalkulation" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.schnittstelleKalkulation')}
        </label>
        <input
          type="text"
          id="schnittstelleKalkulation"
          {...register('schnittstelleKalkulation')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="zusatzinfo" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.zusatzinfo')}
        </label>
        <input
          type="text"
          id="zusatzinfo"
          {...register('zusatzinfo')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="zusatzinfo2" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.zusatzinfo2')}
        </label>
        <input
          type="text"
          id="zusatzinfo2"
          {...register('zusatzinfo2')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="textur3d" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.textur3d')}
        </label>
        <input
          type="text"
          id="textur3d"
          {...register('textur3d')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="textur2d" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.textur2d')}
        </label>
        <input
          type="text"
          id="textur2d"
          {...register('textur2d')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="produktID" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.produktID')}
        </label>
        <input
          type="text"
          id="produktID"
          {...register('produktID')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>
    </div>
  );
}