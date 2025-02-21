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
    </div>
  );
}