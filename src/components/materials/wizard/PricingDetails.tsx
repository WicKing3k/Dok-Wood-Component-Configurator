import { useFormContext } from 'react-hook-form';
import { useI18n } from '../../../lib/i18n/i18n';

export function PricingDetails() {
  const { t } = useI18n();
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.price')} *
        </label>
        <input
          type="number"
          id="price"
          min="0"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.supplier')} *
        </label>
        <input
          type="text"
          id="supplier"
          {...register('supplier')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.supplier && (
          <p className="mt-1 text-sm text-red-600">
            {errors.supplier.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.orderNumber')} *
        </label>
        <input
          type="text"
          id="orderNumber"
          {...register('orderNumber')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
        {errors.orderNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.orderNumber.message as string}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="ecoZertifizierung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.ecoZertifizierung')}
        </label>
        <input
          type="text"
          id="ecoZertifizierung"
          {...register('ecoZertifizierung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="oekobilanz" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.oekobilanz')}
        </label>
        <input
          type="text"
          id="oekobilanz"
          {...register('oekobilanz')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="blauerEngel" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.blauerEngel')}
        </label>
        <input
          type="checkbox"
          id="blauerEngel"
          {...register('blauerEngel')}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="produktdatenblatt" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.produktdatenblatt')}
        </label>
        <input
          type="text"
          id="produktdatenblatt"
          {...register('produktdatenblatt')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="dopLeistungserklaerung" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.dopLeistungserklaerung')}
        </label>
        <input
          type="text"
          id="dopLeistungserklaerung"
          {...register('dopLeistungserklaerung')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="herstellernachweis" className="block text-sm font-medium text-gray-700">
          {t('materials.properties.herstellernachweis')}
        </label>
        <input
          type="text"
          id="herstellernachweis"
          {...register('herstellernachweis')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
        />
      </div>
    </div>
  );
}