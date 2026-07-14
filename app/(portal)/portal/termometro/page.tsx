import { createClient } from "@/lib/supabase/server";
import { MoodHistoryChart } from "@/components/portal/MoodHistoryChart";
import { MOOD_LEVELS } from "@/components/thermometer/EmotionalThermometer";
import { formatDate } from "@/lib/utils";
import type { MoodCheckin, Patient } from "@/lib/types";

export default async function ThermometerHistoryPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: patient } = await supabase
    .from("patients")
    .select("*")
    .eq("user_id", user!.id)
    .maybeSingle();

  if (!patient) {
    return (
      <p className="card-soft p-6 text-sm text-ink-700/60">
        Sua conta ainda não está vinculada a um cadastro de paciente.
      </p>
    );
  }

  const p = patient as Patient;

  const { data: checkins } = await supabase
    .from("mood_checkins")
    .select("*")
    .eq("patient_id", p.id)
    .order("created_at", { ascending: false })
    .limit(30);

  const list = (checkins ?? []) as MoodCheckin[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-800">
          Seu histórico emocional
        </h1>
        <p className="mt-1 text-sm text-ink-700/60">
          Os últimos {list.length} registros do seu termômetro.
        </p>
      </div>

      {list.length === 0 ? (
        <p className="card-soft p-6 text-sm text-ink-700/60">
          Você ainda não registrou nenhum check-in. Volte para a página inicial e registre
          como está se sentindo hoje.
        </p>
      ) : (
        <>
          <div className="card-soft p-5">
            <MoodHistoryChart checkins={list} />
          </div>

          <div className="card-soft divide-y divide-sand-200">
            {list.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-4">
                <span className="text-sm text-ink-700/70">
                  {formatDate(c.created_at.slice(0, 10))}
                </span>
                <span className="text-sm font-medium text-ink-800">
                  {MOOD_LEVELS[c.mood - 1]?.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
