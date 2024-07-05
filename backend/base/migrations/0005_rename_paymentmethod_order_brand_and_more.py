# Generated by Django 5.0.3 on 2024-06-15 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_product_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='paymentMethod',
            new_name='brand',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='shippingPrice',
            new_name='price',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='taxPrice',
            new_name='rating',
        ),
        migrations.RemoveField(
            model_name='order',
            name='deliveredAt',
        ),
        migrations.RemoveField(
            model_name='order',
            name='isDelivered',
        ),
        migrations.RemoveField(
            model_name='order',
            name='isPaid',
        ),
        migrations.RemoveField(
            model_name='order',
            name='paidAt',
        ),
        migrations.RemoveField(
            model_name='order',
            name='totalPrice',
        ),
        migrations.RemoveField(
            model_name='product',
            name='user',
        ),
        migrations.AddField(
            model_name='order',
            name='category',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='countInStock',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='order',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='numReviews',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
