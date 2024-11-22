from django.shortcuts import render, get_object_or_404
from .models import Account


def account_list(request):
    """Vista para mostrar todas las cuentas."""
    accounts = Account.objects.all()
    return render(request, "cuentas/list.html", {"accounts": accounts})


def account_detail(request, account_id):
    """Vista para mostrar detalles de una cuenta."""
    account = get_object_or_404(Account, id=account_id)
    return render(request, "cuentas/detail.html", {"account": account})
