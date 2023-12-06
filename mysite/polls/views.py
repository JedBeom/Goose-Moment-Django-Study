from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Question, Choice

class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"
    
    def get_queryset(self):
        return Question.objects.order_by("-pub_date")[:5]

class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/detail.html"

class ResultsView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"

def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)

    try:
        selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):

        return render(
            request,
            "polls/detail.html",
            {
                "question": question,
                "error_message": "항목을 선택하지 않았습니다.",
            },
        )

    selected_choice.votes += 1
    selected_choice.save()

    # POST를 잘 처리하고 난 뒤에는 항상 HttpResponseRedirect를 반환해야 함.
    # reverse는 URL 하드코딩하지 않도록 도와줌 
    return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))
