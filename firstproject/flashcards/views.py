from django.shortcuts import render

def flashcards_view(request):
    return render(request, "flashcards.html")

