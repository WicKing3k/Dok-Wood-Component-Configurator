import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function BasicInfo() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="bezeichnung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.bezeichnung')} *
        </label>
        <input
          type="text"
          id="bezeichnung"
          {...register('bezeichnung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.bezeichnung && (
          <p className="mt-1 text-sm text-red-600">
            {errors.bezeichnung.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="rohstoff" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.rohstoff')}
        </label>
        <input
          type="text"
          id="rohstoff"
          {...register('rohstoff')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="hersteller" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.hersteller')}
        </label>
        <input
          type="text"
          id="hersteller"
          {...register('hersteller')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="breite" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.breite')}
          </label>
          <input
            type="number"
            id="breite"
            step="0.01"
            {...register('breite', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="hoehe" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.hoehe')}
          </label>
          <input
            type="number"
            id="hoehe"
            step="0.01"
            {...register('hoehe', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="laenge" className="block text-sm font-medium text-gray-700">
            {t('materials.properties.laenge')}
          </label>
          <input
            type="number"
            id="laenge"
            step="0.01"
            {...register('laenge', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="erscheinungsklasse" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.erscheinungsklasse')}
        </label>
        <input
          type="text"
          id="erscheinungsklasse"
          {...register('erscheinungsklasse')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="oberflaeche" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.oberflaeche')}
        </label>
        <input
          type="text"
          id="oberflaeche"
          {...register('oberflaeche')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.keywords')}
        </label>
        <input
          type="text"
          id="keywords"
          {...register('keywords')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>
    </div>
  );
}